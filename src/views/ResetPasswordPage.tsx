import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

import { ResetPasswordController } from '../controllers/ResetPasswordController';
import { isKonfirmasiPasswordSesuai } from '../controllers/validators';
import { palette, styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
type Tahap = 'email' | 'terkirim' | 'password' | 'sukses';

const controller = new ResetPasswordController();

const PESAN_KONFIRMASI_BEDA = 'Konfirmasi password tidak sama';
const BIRU_MUDA = '#EAF0FF';
const BIRU_BORDER = '#C9D7F7';

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <View style={styles.eyeIcon}>
      <View style={styles.eyeShape}>
        <View style={styles.eyePupil} />
      </View>

      {!visible && <View style={styles.eyeSlash} />}
    </View>
  );
}

export default function ResetPasswordPage({ navigation, route }: Props) {
  const mode = route.params?.mode ?? 'request';

  const [tahap, setTahap] = useState<Tahap>(mode === 'request' ? 'email' : 'password');
  const [emailInput, setEmailInput] = useState('');
  const [emailAkun, setEmailAkun] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [lihatPassword, setLihatPassword] = useState(false);
  const [lihatKonfirmasi, setLihatKonfirmasi] = useState(false);
  const [error, setError] = useState('');
  const [errorKonfirmasi, setErrorKonfirmasi] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'request') return;

    controller
      .emailSesi()
      .then(setEmailAkun)
      .catch((e) => setError(e instanceof Error ? e.message : 'Sesi tidak ditemukan'));
  }, [mode]);

  async function submitResetRequest() {
    setError('');
    setLoading(true);

    try {
      await controller.kirimTautan(emailInput);
      setTahap('terkirim');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mengirim tautan');
    } finally {
      setLoading(false);
    }
  }

  async function submitNewPassword() {
    setError('');
    setErrorKonfirmasi('');

    if (!isKonfirmasiPasswordSesuai(passwordBaru, konfirmasi)) {
      setPasswordBaru('');
      setKonfirmasi('');
      setErrorKonfirmasi(PESAN_KONFIRMASI_BEDA);
      return;
    }

    setLoading(true);

    try {
      await controller.validateData(emailAkun, passwordBaru);
      setTahap('sukses');
    } catch (e) {
      setPasswordBaru('');
      setKonfirmasi('');
      setError(e instanceof Error ? e.message : 'Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  }

  async function selesai() {
    if (mode !== 'recovery') {
      navigation.goBack();
      return;
    }

    setError('');
    setLoading(true);

    try {
      await controller.akhiriSesiPemulihan();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal keluar dari sesi pemulihan');
      setLoading(false);
    }
  }

  const bisaKirimTautan = emailInput.trim().length > 0 && !loading;
  const bisaUbahPassword =
    passwordBaru.length > 0 && konfirmasi.length > 0 && emailAkun !== '' && !loading;

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: palette.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.authScrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageHeaderWithBack}>
            {mode !== 'recovery' && (
              <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                accessibilityRole="button"
                accessibilityLabel="Kembali"
              >
                <Text style={styles.backText}>←</Text>
              </Pressable>
            )}

            <Text style={styles.pageTitle}>Reset password</Text>
          </View>

          <View style={styles.brandCard}>
            <Image source={require('../assets/LogoPross.jpeg')} style={styles.brandLogo} />

            <Text style={styles.brandHeadline}>
              {tahap === 'password' ? 'Buat password baru' : 'Pulihkan akses usaha'}
            </Text>

            <Text style={styles.brandSubtitle}>Kembali mengelola usaha Anda dengan aman.</Text>
          </View>

          <View style={styles.form}>

            {tahap === 'email' && (
              <>
                <Text style={styles.helperText}>
                  Masukkan email akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang
                  password.
                </Text>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Email akun</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="nama@email.com"
                    placeholderTextColor={palette.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    editable={!loading}
                    value={emailInput}
                    onChangeText={setEmailInput}
                    onSubmitEditing={submitResetRequest}
                    returnKeyType="send"
                  />
                </View>

                {error !== '' && (
                  <View style={styles.errorPanel}>
                    <Text style={[styles.messageText, { color: palette.error }]}>{error}</Text>
                  </View>
                )}

                {loading && (
                  <View
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: BIRU_MUDA,
                      borderWidth: 1,
                      borderColor: BIRU_BORDER,
                    }}
                  >
                    <Text style={{ color: palette.navy, fontWeight: '700' }}>
                      Permintaan sedang diproses
                    </Text>
                    <Text style={{ color: palette.navy, marginTop: 2, fontSize: 12 }}>
                      Tunggu hingga pengiriman selesai sebelum mencoba lagi.
                    </Text>
                  </View>
                )}

                <Pressable
                  onPress={submitResetRequest}
                  disabled={!bisaKirimTautan}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    bisaKirimTautan ? styles.primaryButtonEnabled : styles.primaryButtonDisabled,
                    pressed && bisaKirimTautan ? styles.primaryButtonPressed : undefined,
                  ]}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator size="small" color={palette.navy} />
                      <Text style={styles.primaryButtonText}>{'  '}Mengirim tautan...</Text>
                    </>
                  ) : (
                    <Text
                      style={[
                        styles.primaryButtonText,
                        !bisaKirimTautan && styles.primaryButtonTextDisabled,
                      ]}
                    >
                      Kirim tautan reset
                    </Text>
                  )}
                </Pressable>

                <Pressable onPress={() => navigation.goBack()}>
                  <Text style={styles.authLink}>Kembali ke Masuk</Text>
                </Pressable>
              </>
            )}

            {tahap === 'terkirim' && (
              <>
                <View style={styles.successPanel}>
                  <Text style={[styles.messageText, { fontWeight: '700', color: palette.success }]}>
                    Tautan reset terkirim
                  </Text>
                  <Text style={[styles.messageText, { color: palette.success }]}>
                    Periksa email {emailInput.trim()}, termasuk folder spam. Buka tautan untuk
                    membuat password baru.
                  </Text>
                </View>

                {error !== '' && (
                  <View style={styles.errorPanel}>
                    <Text style={[styles.messageText, { color: palette.error }]}>{error}</Text>
                  </View>
                )}

                <Pressable
                  onPress={() => navigation.goBack()}
                  style={[styles.primaryButton, styles.primaryButtonEnabled]}
                >
                  <Text style={styles.primaryButtonText}>Kembali ke Masuk</Text>
                </Pressable>

                <Pressable
                  onPress={submitResetRequest}
                  disabled={loading}
                  style={{
                    height: 52,
                    borderRadius: 28,
                    borderWidth: 1,
                    borderColor: palette.border,
                    backgroundColor: palette.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  <Text style={{ fontWeight: '700', color: palette.navy }}>
                    {loading ? 'Mengirim ulang...' : 'Kirim ulang tautan'}
                  </Text>
                </Pressable>

                <Text style={styles.helperText}>
                  Password belum berubah sebelum tahap berikutnya selesai.
                </Text>
              </>
            )}

            {tahap === 'password' && (
              <>
                <View
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: BIRU_MUDA,
                    borderWidth: 1,
                    borderColor: BIRU_BORDER,
                  }}
                >
                  <Text style={{ color: palette.navy, fontWeight: '700' }}>
                    Password baru untuk {emailAkun}
                  </Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Password baru</Text>

                  <View style={styles.passwordField}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Masukkan password baru"
                      placeholderTextColor={palette.placeholder}
                      secureTextEntry={!lihatPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                      value={passwordBaru}
                      onChangeText={setPasswordBaru}
                    />

                    <Pressable
                      style={styles.passwordToggle}
                      onPress={() => setLihatPassword((nilai) => !nilai)}
                      accessibilityRole="button"
                      accessibilityLabel={
                        lihatPassword ? 'Sembunyikan password' : 'Tampilkan password'
                      }
                    >
                      <EyeIcon visible={lihatPassword} />
                    </Pressable>
                  </View>

                  <Text style={styles.helperText}>
                    Saran: frasa panjang dengan huruf, angka, dan simbol.
                  </Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Konfirmasi password baru</Text>

                  <View style={styles.passwordField}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Ulangi password baru"
                      placeholderTextColor={palette.placeholder}
                      secureTextEntry={!lihatKonfirmasi}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                      value={konfirmasi}
                      onChangeText={setKonfirmasi}
                      onSubmitEditing={submitNewPassword}
                      returnKeyType="done"
                    />

                    <Pressable
                      style={styles.passwordToggle}
                      onPress={() => setLihatKonfirmasi((nilai) => !nilai)}
                      accessibilityRole="button"
                      accessibilityLabel={
                        lihatKonfirmasi ? 'Sembunyikan password' : 'Tampilkan password'
                      }
                    >
                      <EyeIcon visible={lihatKonfirmasi} />
                    </Pressable>
                  </View>

                  {errorKonfirmasi !== '' && (
                    <Text style={styles.fieldError}>{errorKonfirmasi}</Text>
                  )}
                </View>

                {error !== '' && (
                  <View style={styles.errorPanel}>
                    <Text style={[styles.messageText, { color: palette.error }]}>{error}</Text>
                  </View>
                )}

                <Pressable
                  onPress={submitNewPassword}
                  disabled={!bisaUbahPassword}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    bisaUbahPassword
                      ? styles.primaryButtonEnabled
                      : styles.primaryButtonDisabled,
                    pressed && bisaUbahPassword ? styles.primaryButtonPressed : undefined,
                  ]}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator size="small" color={palette.navy} />
                      <Text style={styles.primaryButtonText}>{'  '}Menyimpan...</Text>
                    </>
                  ) : (
                    <Text
                      style={[
                        styles.primaryButtonText,
                        !bisaUbahPassword && styles.primaryButtonTextDisabled,
                      ]}
                    >
                      Ubah password
                    </Text>
                  )}
                </Pressable>
              </>
            )}

            {tahap === 'sukses' && (
              <>
                <View style={styles.successPanel}>
                  <Text style={[styles.messageText, { fontWeight: '700', color: palette.success }]}>
                    Password berhasil diubah
                  </Text>
                  <Text style={[styles.messageText, { color: palette.success }]}>
                    Gunakan password baru untuk masuk ke akun Pross Anda.
                  </Text>
                </View>

                {error !== '' && (
                  <View style={styles.errorPanel}>
                    <Text style={[styles.messageText, { color: palette.error }]}>{error}</Text>
                  </View>
                )}

                <Pressable
                  onPress={selesai}
                  disabled={loading}
                  style={[
                    styles.primaryButton,
                    loading ? styles.primaryButtonDisabled : styles.primaryButtonEnabled,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    {mode === 'recovery' ? 'Kembali ke Masuk' : 'Kembali'}
                  </Text>
                </Pressable>
              </>
            )}
          </View>

          <View style={styles.authFooter}>
            <Text style={styles.footerText}>Pross · Teman tumbuh usaha kuliner Anda</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}