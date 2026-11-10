import { supabase } from '../services/supabase';

export class PemilikUsaha {
  constructor(
    private username: string,
    private email: string,
    private password: string = '',
    private namaUsaha: string = '',
    private noTelp: string = '',
  ) {}

  static async muatSaatIni(): Promise<PemilikUsaha> {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      throw new Error('Pengguna belum login');
    }

    const { data } = await supabase
      .from('tbl_pemilik_usaha')
      .select('*')
      .eq('id', userData.user.id)
      .maybeSingle();

    const email = userData.user.email ?? '';
    const username = data?.username ?? (userData.user.user_metadata?.username as string) ?? '';
    const namaUsaha = data?.nama_usaha ?? '';
    const noTelp = data?.no_telp ?? '';

    return new PemilikUsaha(username, email, '', namaUsaha, noTelp);
  }

  async createUser(): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email: this.email.trim().toLowerCase(),
      password: this.password,
      options: {
        data: { username: this.username.trim().toLowerCase() },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    this.password = '';
  }

  static async isTerdaftar(username: string, email: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('account_exists', {
      p_username: username.trim().toLowerCase(),
      p_email: email.trim().toLowerCase(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return data === true;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getNamaUsaha(): string {
    return this.namaUsaha;
  }

  getNoTelp(): string {
    return this.noTelp;
  }

  async setNamaUsaha(nilai: string): Promise<void> {
    await this.updateKolom('nama_usaha', nilai);
    this.namaUsaha = nilai;
  }

  async setNoTelp(nilai: string): Promise<void> {
    await this.updateKolom('no_telp', nilai);
    this.noTelp = nilai;
  }

  async setPassword(passwordBaru: string): Promise<void> {
    if (!passwordBaru) {
      throw new Error('Password tidak boleh kosong');
    }

    const { error } = await supabase.auth.updateUser({ password: passwordBaru });
    if (error) {
      throw new Error(error.message);
    }
  }

  private async updateKolom(
    kolom: 'nama_usaha' | 'no_telp',
    nilai: string,
  ): Promise<void> {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      throw new Error('Pengguna belum login');
    }

    const { error } = await supabase
      .from('tbl_pemilik_usaha')
      .update({ [kolom]: nilai })
      .eq('id', userData.user.id);

    if (error) {
      throw new Error(error.message);
    }
  }
}