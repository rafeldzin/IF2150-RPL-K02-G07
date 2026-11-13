import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

/* -------------------------------------------------------------------------- */
/*  Konfigurasi skema                                                          */
/*  Sesuaikan nama tabel/kolom di sini jika skema Supabase kamu berbeda.       */
/* -------------------------------------------------------------------------- */
const TABLE = {
  bahanBaku: 'tbl_bahan_baku',
  riwayatHarga: 'tbl_riwayat_harga_bahan', // C14
} as const;

const COL = {
  bahanId: 'id_bahan',
  bahanNama: 'nama_bahan',
  bahanSatuan: 'satuan',
  riwayatId: 'id_riwayat',
  riwayatBahan: 'id_bahan',
  riwayatHarga: 'harga_beli_baru',
  riwayatTanggal: 'waktu_perubahan', // timestamptz / date
} as const;

/* -------------------------------------------------------------------------- */
/*  Tipe                                                                       */
/* -------------------------------------------------------------------------- */
export type RentangWaktu = 7 | 30 | 90;

export const OPSI_RENTANG_WAKTU: { value: RentangWaktu; label: string }[] = [
  { value: 7, label: '7 hari terakhir' },
  { value: 30, label: '30 hari terakhir' },
  { value: 90, label: '90 hari terakhir' },
];

export interface BahanBaku {
  id: string;
  nama: string;
  satuan: string;
}

export interface RiwayatHarga {
  id: string;
  bahanId: string;
  harga: number;
  /** ISO string */
  tanggal: string;
}

/** Bentuk data yang langsung cocok dengan <LineChart data={...} /> react-native-chart-kit. */
export interface ChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

export interface RingkasanTren {
  terendah: number;
  tertinggi: number;
  rataRata: number;
  hargaAwal: number;
  hargaAkhir: number;
  /** Perubahan persen dari harga awal ke harga akhir. */
  perubahanPersen: number;
}

export interface TrenResult {
  chart: ChartData;
  /** Jumlah titik data (hari unik) pada chart. */
  jumlahTitik: number;
  ringkasan: RingkasanTren | null;
}

export class TrenBahanBakuError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'TrenBahanBakuError';
  }
}

/* -------------------------------------------------------------------------- */
/*  Controller                                                                 */
/* -------------------------------------------------------------------------- */
export class TrenBahanBakuController {
  constructor(private readonly client: SupabaseClient = supabase) {}

  /** Ambil semua bahan baku (urut A-Z) dari tbl_bahan_baku. */
  async getDaftarBahanBaku(): Promise<BahanBaku[]> {
    const { data, error } = await this.client
      .from(TABLE.bahanBaku)
      .select([COL.bahanId, COL.bahanNama, COL.bahanSatuan].join(','))
      .order(COL.bahanNama, { ascending: true });

    if (error) {
      throw new TrenBahanBakuError('Gagal memuat daftar bahan baku. Periksa koneksi lalu coba lagi.', error);
    }

    return ((data ?? []) as unknown as Record<string, unknown>[]).map((row) => ({
      id: String(row[COL.bahanId]),
      nama: String(row[COL.bahanNama] ?? '-'),
      satuan: String(row[COL.bahanSatuan] ?? ''),
    }));
  }

  /**
   * Ambil riwayat harga satu bahan baku pada rentang waktu tertentu
   * (filter dilakukan di server lewat query .gte).
   *
   * Jika harga tidak berubah selama rentang tersebut (tidak ada baris baru),
   * harga terakhir SEBELUM rentang dipakai sebagai titik awal, supaya chart
   * tidak kosong padahal harganya sebenarnya stabil.
   */
  async getRiwayatHarga(bahanId: string, rentang: RentangWaktu): Promise<RiwayatHarga[]> {
    const batasAwal = this.hitungBatasAwal(rentang);

    const { data, error } = await this.client
      .from(TABLE.riwayatHarga)
      .select([COL.riwayatId, COL.riwayatBahan, COL.riwayatHarga, COL.riwayatTanggal].join(','))
      .eq(COL.riwayatBahan, bahanId)
      .gte(COL.riwayatTanggal, batasAwal.toISOString())
      .order(COL.riwayatTanggal, { ascending: true });

    if (error) {
      throw new TrenBahanBakuError('Gagal memuat riwayat harga. Periksa koneksi lalu coba lagi.', error);
    }

    const riwayat = this.mapRiwayat((data ?? []) as unknown as Record<string, unknown>[]);

    // Titik awal (baseline): harga terakhir sebelum rentang dimulai.
    const { data: sebelum, error: errSebelum } = await this.client
      .from(TABLE.riwayatHarga)
      .select([COL.riwayatId, COL.riwayatBahan, COL.riwayatHarga, COL.riwayatTanggal].join(','))
      .eq(COL.riwayatBahan, bahanId)
      .lt(COL.riwayatTanggal, batasAwal.toISOString())
      .order(COL.riwayatTanggal, { ascending: false })
      .limit(1);

    if (errSebelum) {
      throw new TrenBahanBakuError('Gagal memuat riwayat harga. Periksa koneksi lalu coba lagi.', errSebelum);
    }

    const baseline = this.mapRiwayat(
      (sebelum ?? []) as unknown as Record<string, unknown>[]
    )[0];

    if (baseline) {
      riwayat.unshift({
        ...baseline,
        tanggal: batasAwal.toISOString(),
      });
    } else if (riwayat.length > 0) {
      const { data: pertama, error: errPertama } = await this.client
        .from(TABLE.riwayatHarga)
        .select('harga_beli_lama')
        .eq(COL.riwayatBahan, bahanId)
        .gte(COL.riwayatTanggal, batasAwal.toISOString())
        .order(COL.riwayatTanggal, { ascending: true })
        .limit(1)
        .single();

      if (errPertama) {
        throw new TrenBahanBakuError(
          'Gagal memuat harga awal bahan baku.',
          errPertama
        );
      }

      riwayat.unshift({
        id: 'baseline',
        bahanId,
        harga: Number(pertama.harga_beli_lama),
        tanggal: batasAwal.toISOString(),
      });
    }

    return riwayat;
  }

  /**
   * Filter lokal (tanpa query) berdasarkan rentang waktu.
   * Berguna jika data sudah di-cache dan user hanya mengganti dropdown.
   */
  filterByRentang(riwayat: RiwayatHarga[], rentang: RentangWaktu): RiwayatHarga[] {
    const batas = this.hitungBatasAwal(rentang).getTime();
    return riwayat.filter((r) => new Date(r.tanggal).getTime() >= batas);
  }

  /**
   * Ubah riwayat harga menjadi data siap pakai untuk chart + ringkasan.
   * - Beberapa perubahan di hari yang sama -> diambil harga terakhir hari itu.
   * - Label sumbu-X dijarangkan (maks ±5 label) supaya tidak bertumpuk.
   */
  formatUntukChart(riwayat: RiwayatHarga[]): TrenResult {
    // 1) Kelompokkan per hari (kunci: yyyy-mm-dd lokal), ambil harga terakhir.
    const perHari = new Map<string, { tanggal: Date; harga: number }>();
    [...riwayat]
      .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
      .forEach((r) => {
        const d = new Date(r.tanggal);
        if (Number.isNaN(d.getTime()) || !Number.isFinite(r.harga)) return; // chart-kit crash jika NaN
        const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        perHari.set(key, { tanggal: d, harga: r.harga });
      });

    const titik = Array.from(perHari.values());

    if (titik.length === 0) {
      return { chart: { labels: [], datasets: [{ data: [] }] }, jumlahTitik: 0, ringkasan: null };
    }

    // 2) Label tanggal "dd/MM", hanya tampilkan setiap N titik.
    const langkah = Math.max(1, Math.ceil(titik.length / 5));
    const labels = titik.map((t, i) =>
      i % langkah === 0 || i === titik.length - 1 ? this.labelTanggal(t.tanggal) : '',
    );
    const harga = titik.map((t) => t.harga);

    // 3) Ringkasan
    const hargaAwal = harga[0];
    const hargaAkhir = harga[harga.length - 1];
    const ringkasan: RingkasanTren = {
      terendah: Math.min(...harga),
      tertinggi: Math.max(...harga),
      rataRata: harga.reduce((sum, h) => sum + h, 0) / harga.length,
      hargaAwal,
      hargaAkhir,
      perubahanPersen: hargaAwal > 0 ? ((hargaAkhir - hargaAwal) / hargaAwal) * 100 : 0,
    };

    return {
      chart: { labels, datasets: [{ data: harga }] },
      jumlahTitik: titik.length,
      ringkasan,
    };
  }

  /** Shortcut: ambil dari Supabase lalu langsung format untuk chart. */
  async getTren(bahanId: string, rentang: RentangWaktu): Promise<TrenResult> {
    const riwayat = await this.getRiwayatHarga(bahanId, rentang);
    return this.formatUntukChart(riwayat);
  }

  /* ------------------------------ helper privat ----------------------------- */

  /** Awal hari (00:00) untuk N hari ke belakang, termasuk hari ini. */
  private hitungBatasAwal(rentang: RentangWaktu): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (rentang - 1));
    return d;
  }

  private labelTanggal(d: Date): string {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}`;
  }

  private mapRiwayat(rows: Record<string, unknown>[]): RiwayatHarga[] {
    return rows.map((row) => ({
      id: String(row[COL.riwayatId]),
      bahanId: String(row[COL.riwayatBahan]),
      harga: Number(row[COL.riwayatHarga]),
      tanggal: String(row[COL.riwayatTanggal]),
    }));
  }
}

/** Instance siap pakai untuk View. */
export const trenBahanBakuController = new TrenBahanBakuController();
