import * as Linking from 'expo-linking';
import { PemilikUsaha } from '../models/PemilikUsaha';
import { supabase } from '../services/supabase';
import { AuthController, ValidationError } from './AuthController';
import { isPasswordKuat } from './validators';

export const PATH_RESET_PASSWORD = 'reset-password';
export const PESAN_EMAIL_KOSONG = 'Email tidak boleh kosong';
export const PESAN_AKUN_TIDAK_DITEMUKAN = 'Tidak dapat menemukan akun';
export const PESAN_PASSWORD_LEMAH = 'Password terlalu lemah';
export const PESAN_TAUTAN_TIDAK_VALID =
  'Tautan reset tidak valid atau sudah kedaluwarsa. Minta tautan baru.';

export type TautanReset =
  | { tipe: 'bukan-reset' }
  | { tipe: 'token'; accessToken: string; refreshToken: string }
  | { tipe: 'galat'; pesan: string };

export type HasilTautan =
  | { tipe: 'bukan-reset' }
  | { tipe: 'berhasil'; email: string }
  | { tipe: 'galat'; pesan: string };

export function bacaTautanReset(url: string): TautanReset {
  if (!url.includes(PATH_RESET_PASSWORD)) {
    return { tipe: 'bukan-reset' };
  }

  const indeks = url.indexOf('#');
  const params = new URLSearchParams(indeks >= 0 ? url.slice(indeks + 1) : '');

  if (params.get('error') || params.get('error_code')) {
    return { tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID };
  }

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (accessToken && refreshToken) {
    return { tipe: 'token', accessToken, refreshToken };
  }

  return { tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID };
}

export class ResetPasswordController {
  private auth = new AuthController();

  async validateData(email: string, password: string | null): Promise<boolean> {
    const emailBersih = email.trim();

    if (emailBersih === '') {
      throw new ValidationError(PESAN_EMAIL_KOSONG);
    }

    if (!(await PemilikUsaha.isTerdaftar('', emailBersih))) {
      throw new ValidationError(PESAN_AKUN_TIDAK_DITEMUKAN);
    }

    if (password !== null) {
      if (!isPasswordKuat(password)) {
        throw new ValidationError(PESAN_PASSWORD_LEMAH);
      }

      await this.resetPassword(emailBersih, password);
    }

    return true;
  }

  async kirimTautan(email: string): Promise<void> {
    await this.validateData(email, null);

    const redirectTo = Linking.createURL(PATH_RESET_PASSWORD);


    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo },
    );

    if (error) {
      throw new Error(error.message);
    }
  }

  async terimaTautan(url: string): Promise<HasilTautan> {
    const tautan = bacaTautanReset(url);

    if (tautan.tipe === 'bukan-reset') {
      return { tipe: 'bukan-reset' };
    }

    if (tautan.tipe === 'galat') {
      return tautan;
    }

    const { data, error } = await supabase.auth.setSession({
      access_token: tautan.accessToken,
      refresh_token: tautan.refreshToken,
    });

    if (error || !data.user?.email) {
      return { tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID };
    }

    return { tipe: 'berhasil', email: data.user.email };
  }

  async emailSesi(): Promise<string> {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user?.email) {
      throw new Error('Sesi tidak ditemukan');
    }

    return data.user.email;
  }

  async resetPassword(email: string, password: string): Promise<void> {
    const emailSekarang = await this.emailSesi();

    if (emailSekarang.toLowerCase() !== email.trim().toLowerCase()) {
      throw new ValidationError(PESAN_AKUN_TIDAK_DITEMUKAN);
    }

    const pemilik = await PemilikUsaha.muatSaatIni();
    await pemilik.setPassword(password);
  }

  async akhiriSesiPemulihan(): Promise<void> {
    await this.auth.logout();
  }
}