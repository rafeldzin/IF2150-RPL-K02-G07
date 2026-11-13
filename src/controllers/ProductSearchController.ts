import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

/* -------------------------------------------------------------------------- */
/*  Konfigurasi skema                                                          */
/*  Sesuaikan nama tabel/kolom di sini jika skema Supabase kamu berbeda.       */
/* -------------------------------------------------------------------------- */
const TABLE = {
  produk: 'tbl_produk',
  komposisi: 'tbl_resep_bahan',
  bahanBaku: 'tbl_bahan_baku',
} as const;

const COL = {
  produkId: 'id_produk',
  produkNama: 'nama_produk',
  produkTag: 'tag', // text, dipisah koma. Contoh: "minuman,kopi,dingin"
  produkHargaJual: 'harga_jual',
  produkMargin: 'margin',
  komposisiProduk: 'id_produk',
  komposisiBahan: 'id_bahan',
  bahanId: 'id_bahan',
  bahanNama: 'nama_bahan',
} as const;

const PRODUK_SELECT = [
  COL.produkId,
  COL.produkNama,
  COL.produkTag,
  COL.produkHargaJual,
  COL.produkMargin,
].join(',');

/* -------------------------------------------------------------------------- */
/*  Tipe                                                                       */
/* -------------------------------------------------------------------------- */
export type SearchFilter = 'semua' | 'nama' | 'tag' | 'bahan_baku';

export interface Product {
  id: string;
  nama: string;
  tag: string[];
  hargaJual: number | null;
  hpp: number | null;
}

export interface ProductSearchParams {
  keyword: string;
  /** 'semua' = cocokkan nama ATAU tag. Default: 'semua'. */
  filter?: SearchFilter;
  /** Batas jumlah hasil. Default: 50. */
  limit?: number;
}

type ProdukRow = Record<string, unknown>;

export class ProductSearchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'ProductSearchError';
  }
}

/* -------------------------------------------------------------------------- */
/*  Controller                                                                 */
/* -------------------------------------------------------------------------- */
export class ProductSearchController {
  constructor(private readonly client: SupabaseClient = supabase) {}

  /**
   * Cari produk berdasarkan kata kunci.
   * - Kata kunci kosong  -> mengembalikan daftar produk (diurutkan A-Z).
   * - Tidak ada yang cocok -> mengembalikan array kosong ([]).
   * - Gagal query         -> melempar ProductSearchError.
   */
  async search({ keyword, filter = 'semua', limit = 50 }: ProductSearchParams): Promise<Product[]> {
    const kw = this.sanitize(keyword);

    let query = this.client
      .from(TABLE.produk)
      .select(PRODUK_SELECT)
      .order(COL.produkNama, { ascending: true })
      .limit(limit);

    if (kw) {
      const pattern = `%${kw}%`;

      switch (filter) {
        case 'nama':
          query = query.ilike(COL.produkNama, pattern);
          break;

        case 'tag':
          query = query.contains(COL.produkTag, [kw.toLowerCase()]);
          break;

        case 'bahan_baku': {
          const productIds = await this.findProductIdsByIngredient(pattern);

          if (productIds.length === 0) return [];

          query = query.in(COL.produkId, productIds);
          break;
        }

        case 'semua':
        default: {
          const [hasilNama, hasilTag] = await Promise.all([
            this.client
              .from(TABLE.produk)
              .select(COL.produkId)
              .ilike(COL.produkNama, pattern),

            this.client
              .from(TABLE.produk)
              .select(COL.produkId)
              .contains(COL.produkTag, [kw.toLowerCase()]),
          ]);

          if (hasilNama.error || hasilTag.error) {
            throw new ProductSearchError('Gagal mencari produk.');
          }

          const ids = [
            ...(hasilNama.data ?? []),
            ...(hasilTag.data ?? []),
          ].map((row) => String(row[COL.produkId]));

          const uniqueIds = [...new Set(ids)];

          if (uniqueIds.length === 0) return [];

          query = query.in(COL.produkId, uniqueIds);
          break;
        }
      }
    }

    const { data, error } = await query;
    if (error) {
      throw new ProductSearchError('Gagal mengambil data produk. Periksa koneksi lalu coba lagi.', error);
    }

    return ((data ?? []) as unknown as ProdukRow[]).map(this.toProduct);
  }

  /* ------------------------------ helper privat ----------------------------- */

  /** Bahan baku -> id produk yang memakainya (lewat tabel komposisi/resep). */
  private async findProductIdsByIngredient(pattern: string): Promise<string[]> {
    const { data: bahan, error: bahanError } = await this.client
      .from(TABLE.bahanBaku)
      .select(COL.bahanId)
      .ilike(COL.bahanNama, pattern);

    if (bahanError) {
      throw new ProductSearchError('Gagal mencari bahan baku.', bahanError);
    }

    const bahanIds = ((bahan ?? []) as unknown as ProdukRow[]).map((b) => b[COL.bahanId] as string | number);
    if (bahanIds.length === 0) return [];

    const { data: komposisi, error: komposisiError } = await this.client
      .from(TABLE.komposisi)
      .select(COL.komposisiProduk)
      .in(COL.komposisiBahan, bahanIds);

    if (komposisiError) {
      throw new ProductSearchError('Gagal mencari produk berdasarkan bahan baku.', komposisiError);
    }

    const ids = ((komposisi ?? []) as unknown as ProdukRow[]).map((k) => String(k[COL.komposisiProduk]));
    return Array.from(new Set(ids));
  }

  /** Buang karakter yang punya arti khusus di filter PostgREST / pola ILIKE. */
  private sanitize(keyword: string): string {
    return keyword.replace(/[%*,()"\\_]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private toProduct = (row: ProdukRow): Product => {
    const rawTag = row[COL.produkTag];
    const tag = Array.isArray(rawTag)
      ? rawTag.map(String)
      : typeof rawTag === 'string'
        ? rawTag.split(',')
        : [];

    const toNumber = (v: unknown): number | null => {
      const n = typeof v === 'number' ? v : Number(v);
      return v === null || v === undefined || !Number.isFinite(n) ? null : n;
    };

    const hargaJual = toNumber(row[COL.produkHargaJual]);
    const margin = toNumber(row[COL.produkMargin]);

    return {
      id: String(row[COL.produkId]),
      nama: String(row[COL.produkNama] ?? '-'),
      tag: tag.map((t) => t.trim()).filter(Boolean),
      hargaJual,
      hpp: hargaJual !== null && margin !== null
        ? hargaJual - margin
        : null,
    };
  };
}

/** Instance siap pakai untuk View. */
export const productSearchController = new ProductSearchController();
