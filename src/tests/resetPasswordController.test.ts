import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  baris: {
    username: 'sari',
    email: 'sari@dapur.id',
    nama_usaha: null as string | null,
    no_telp: null as string | null,
  },
  emailTerdaftar: true,
  emailSesi: 'sari@dapur.id' as string | null,
  resetCalls: [] as { email: string; redirectTo?: string }[],
  resetError: null as { message: string } | null,
  sessionCalls: [] as { access_token: string; refresh_token: string }[],
  sessionError: null as { message: string } | null,
  passwordUpdates: [] as string[],
  signOutCalls: 0,
}));

vi.mock('expo-linking', () => ({
  createURL: (path: string) => `pross://${path}`,
}));

vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      getUser: async () => ({
        data: { user: state.emailSesi ? { id: 'u1', email: state.emailSesi } : null },
        error: null,
      }),
      resetPasswordForEmail: async (email: string, opsi?: { redirectTo?: string }) => {
        state.resetCalls.push({ email, redirectTo: opsi?.redirectTo });
        return { error: state.resetError };
      },
      setSession: async (token: { access_token: string; refresh_token: string }) => {
        state.sessionCalls.push(token);
        return {
          data: { user: state.emailSesi ? { email: state.emailSesi } : null },
          error: state.sessionError,
        };
      },
      updateUser: async (atribut: { password?: string }) => {
        if (atribut.password) state.passwordUpdates.push(atribut.password);
        return { error: null };
      },
      signOut: async () => {
        state.signOutCalls += 1;
        return { error: null };
      },
    },
    rpc: async () => ({ data: state.emailTerdaftar, error: null }),
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: state.baris, error: null }),
          maybeSingle: async () => ({ data: state.baris, error: null }),
        }),
      }),
    }),
  },
}));

import {
  PESAN_AKUN_TIDAK_DITEMUKAN,
  PESAN_EMAIL_KOSONG,
  PESAN_PASSWORD_LEMAH,
  PESAN_TAUTAN_TIDAK_VALID,
  ResetPasswordController,
  bacaTautanReset,
} from '../controllers/ResetPasswordController';

beforeEach(() => {
  state.emailTerdaftar = true;
  state.emailSesi = 'sari@dapur.id';
  state.resetCalls = [];
  state.resetError = null;
  state.sessionCalls = [];
  state.sessionError = null;
  state.passwordUpdates = [];
  state.signOutCalls = 0;
});

describe('bacaTautanReset', () => {
  it('mengambil token dari fragment tautan pemulihan', () => {
    const url = 'pross://reset-password#access_token=abc&refresh_token=def&type=recovery';

    expect(bacaTautanReset(url)).toEqual({
      tipe: 'token',
      accessToken: 'abc',
      refreshToken: 'def',
    });
  });

  it('menganggap URL lain bukan tautan reset', () => {
    expect(bacaTautanReset('pross://home')).toEqual({ tipe: 'bukan-reset' });
  });

  it('mengembalikan galat jika tautan kedaluwarsa', () => {
    const url =
      'exp://192.168.1.5:8081/--/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired';

    expect(bacaTautanReset(url)).toEqual({ tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID });
  });

  it('mengembalikan galat jika token tidak ada', () => {
    expect(bacaTautanReset('pross://reset-password')).toEqual({
      tipe: 'galat',
      pesan: PESAN_TAUTAN_TIDAK_VALID,
    });
  });
});

describe('ResetPasswordController.validateData', () => {
  const c = new ResetPasswordController();

  it('menolak email kosong', async () => {
    await expect(c.validateData('   ', null)).rejects.toThrow(PESAN_EMAIL_KOSONG);
  });

  it('menolak email yang tidak terdaftar', async () => {
    state.emailTerdaftar = false;

    await expect(c.validateData('x@y.id', null)).rejects.toThrow(PESAN_AKUN_TIDAK_DITEMUKAN);
  });

  it('true untuk mode cek akun saja tanpa mengubah password', async () => {
    expect(await c.validateData('sari@dapur.id', null)).toBe(true);
    expect(state.passwordUpdates).toEqual([]);
  });

  it('menolak password yang lemah', async () => {
    await expect(c.validateData('sari@dapur.id', 'abc')).rejects.toThrow(PESAN_PASSWORD_LEMAH);
    expect(state.passwordUpdates).toEqual([]);
  });

  it('mengganti password jika data valid', async () => {
    expect(await c.validateData('sari@dapur.id', 'Abcdef12')).toBe(true);
    expect(state.passwordUpdates).toEqual(['Abcdef12']);
  });

  it('menolak jika email bukan milik sesi yang aktif', async () => {
    state.emailSesi = 'lain@dapur.id';

    await expect(c.validateData('sari@dapur.id', 'Abcdef12')).rejects.toThrow(
      PESAN_AKUN_TIDAK_DITEMUKAN,
    );
    expect(state.passwordUpdates).toEqual([]);
  });
});

describe('ResetPasswordController.kirimTautan', () => {
  const c = new ResetPasswordController();

  it('mengirim tautan dengan redirectTo ke app', async () => {
    await c.kirimTautan('  Sari@Dapur.id ');

    expect(state.resetCalls).toEqual([
      { email: 'sari@dapur.id', redirectTo: 'pross://reset-password' },
    ]);
  });

  it('tidak mengirim apa pun jika akun tidak terdaftar', async () => {
    state.emailTerdaftar = false;

    await expect(c.kirimTautan('x@y.id')).rejects.toThrow(PESAN_AKUN_TIDAK_DITEMUKAN);
    expect(state.resetCalls).toEqual([]);
  });

  it('meneruskan error dari Supabase', async () => {
    state.resetError = { message: 'email rate limit exceeded' };

    await expect(c.kirimTautan('sari@dapur.id')).rejects.toThrow('email rate limit exceeded');
  });
});

describe('ResetPasswordController.terimaTautan', () => {
  const c = new ResetPasswordController();

  it('mengabaikan URL yang bukan tautan reset', async () => {
    expect(await c.terimaTautan('pross://home')).toEqual({ tipe: 'bukan-reset' });
    expect(state.sessionCalls).toEqual([]);
  });

  it('membuat sesi dari token dan mengembalikan email', async () => {
    const hasil = await c.terimaTautan(
      'pross://reset-password#access_token=abc&refresh_token=def&type=recovery',
    );

    expect(state.sessionCalls).toEqual([{ access_token: 'abc', refresh_token: 'def' }]);
    expect(hasil).toEqual({ tipe: 'berhasil', email: 'sari@dapur.id' });
  });

  it('mengembalikan galat jika setSession gagal', async () => {
    state.sessionError = { message: 'invalid' };

    const hasil = await c.terimaTautan(
      'pross://reset-password#access_token=abc&refresh_token=def&type=recovery',
    );

    expect(hasil).toEqual({ tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID });
  });

  it('tidak membuat sesi untuk tautan kedaluwarsa', async () => {
    const hasil = await c.terimaTautan(
      'pross://reset-password#error=access_denied&error_code=otp_expired',
    );

    expect(hasil).toEqual({ tipe: 'galat', pesan: PESAN_TAUTAN_TIDAK_VALID });
    expect(state.sessionCalls).toEqual([]);
  });
});

describe('ResetPasswordController.akhiriSesiPemulihan', () => {
  it('mengakhiri sesi satu kali', async () => {
    await new ResetPasswordController().akhiriSesiPemulihan();

    expect(state.signOutCalls).toBe(1);
  });
});