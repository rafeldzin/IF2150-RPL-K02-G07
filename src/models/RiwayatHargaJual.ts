import { isAngkaPositif, PESAN_INPUT_TIDAK_VALID } from './pesan';

export class RiwayatHargaJual {
  private hargaJualLama: number = 0;
  private hargaBaru: number;
  private waktuPerubahan: Date = new Date();

  constructor(hargaBaru: number) {
    if (!isAngkaPositif(hargaBaru)) {
      throw new Error(PESAN_INPUT_TIDAK_VALID);
    }
    this.hargaBaru = hargaBaru;
  }

  public setHargaJualLama(hargaJualLama: number): void {
    if (!isAngkaPositif(hargaJualLama)) {
      throw new Error(PESAN_INPUT_TIDAK_VALID);
    }
    this.hargaJualLama = hargaJualLama;
  }

  public setWaktuPerubahan(waktuPerubahan: Date): void {
    if (!waktuPerubahan) {
      throw new Error("Waktu perubahan tidak boleh kosong");
    }
    this.waktuPerubahan = waktuPerubahan;
  }

  public getHargaJualLama(): number {
    return this.hargaJualLama;
  }

  public getHargaBaru(): number {
    return this.hargaBaru;
  }

  public getWaktuPerubahan(): Date {
    return this.waktuPerubahan;
  }
}