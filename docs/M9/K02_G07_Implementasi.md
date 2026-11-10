<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
</h1>
<br>

## *Pross*
<img alt="Logo Pross" src="./assets/Logo temp Pross.jpeg" width="70%">

### Untuk: *Stefani Angeline Oroh*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *K02* |
| Kelompok | *G07* |

| NIM | Nama |
| --- | --- |
| *13525002* | *Ahmad Boutros Fathir* |
| *13525020* | *Klio Lysander* |
| *13525047* | *Muhammad Fakhriyan Rizki M.* |
| *13525053* | *Kevin Sie* |
| *13525056* | *Mochammad Nuha Al Ghifari* |
| *13525062* | *Rafel Dzinun Muhammad* |
---

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini adalah **spesifikasi sekaligus template laporan singkat** Tugas 9. Bagian **Ketentuan Implementasi** (Bagian A) adalah aturan yang harus kalian ikuti, boleh dihapus dari laporan akhir. Bagian **Laporan Implementasi** (Bagian B) adalah yang **wajib kalian isi**. Gunakan nama, ID, kebutuhan, use case, dan kelas yang konsisten dengan SKPL, APL, dan DPPL.

---

**Deadline:** Rabu, 11 November 2026, 21.50 WIB
**Asistensi akbar:** *[Senin, 2 November 2026, 19.00 WIB, MSTEAMS]*

---

# BAGIAN A: Ketentuan Implementasi

## A.1 Deskripsi Tugas

Pada tugas ini, kalian mengimplementasikan perangkat lunak yang telah dirancang pada tugas-tugas sebelumnya (SKPL, APL, DPPL) menjadi aplikasi yang **dapat dijalankan**. Platform bebas (web, desktop, atau mobile) selama aplikasi dapat dijalankan ulang oleh asisten mengikuti petunjuk kalian.

Ketentuan umum:
- Setiap anggota bertanggung jawab atas **minimal satu fitur atau modul** dan harus terlihat jelas di riwayat commit/PR.
- Implementasi harus **mengacu pada DPPL**. Jika ada yang berubah (kelas, layar, basis data, dsb.), catat di Bagian B.1. Perubahan itu wajar, tetapi harus tercatat dan beralasan.
- Implementasi **tidak harus berupa kelas** (misalnya fungsi, komponen, *route/handler*, *stored procedure*, atau skrip). Namun, setiap kelas perancangan pada DPPL **wajib dapat ditelusuri** ke implementasinya, dan penelusuran ini dicatat di Bagian B.5.
- Seluruh use case pada SKPL **diprioritaskan** untuk diimplementasikan. Status tiap use case akan dilaporkan pada HIUPL (Tugas 10).
- Seluruh mahasiswa **wajib** mengikuti asistensi akbar.

## A.2 Platform, Bahasa, dan Teknologi

Kalian **bebas** memilih bahasa, framework, library, dan basis data, dengan syarat:

1. **Dapat dijalankan ulang** oleh asisten pada mesin biasa dengan mengikuti README. Versi bahasa/runtime dan seluruh dependensi harus tertulis jelas.
2. **Dependensi dikelola lewat file standar**, misalnya `package.json` + lockfile, `requirements.txt`/`pyproject.toml`, `pom.xml`/`build.gradle`, `composer.json`, `pubspec.yaml`, dan sejenisnya. Jangan meng-commit folder hasil instalasi (`node_modules/`, `venv/`, `build/`, dll.).
3. **Jika memakai layanan eksternal** (basis data cloud, API pihak ketiga, auth, dll.), sediakan cara menjalankan tanpa akun pribadi kalian, atau sediakan data/akun uji pada README. Basis data **sangat disarankan** dapat dijalankan lokal (SQLite, atau Docker Compose untuk PostgreSQL/MySQL/MongoDB).
4. **Arsitektur sesuai DPPL.** Pola arsitektur yang kalian pilih di APL/DPPL (MVC, layered, client-server, dll.) harus terlihat pada struktur kode.

Ketentuan tambahan per platform:

| Platform | Ketentuan |
| :--- | :--- |
| **Web** | Berjalan lokal lewat satu-dua perintah yang terdokumentasi. Boleh juga di-*deploy*; jika ya, cantumkan URL, tetapi **tetap wajib bisa dijalankan lokal** (URL deploy bisa mati). |
| **Desktop** | Berjalan dari source lewat perintah yang terdokumentasi. Build/installer opsional. |
| **Mobile** | Berjalan di emulator/simulator atau perangkat. Sertakan langkah menjalankan, dan **sangat disarankan** melampirkan APK/build di Release. |

## A.3 Keamanan Repository

Repo fork kelompok bersifat **public**, sehingga:

- **Dilarang** meng-commit password, API key, token, `.env` asli, sertifikat/private key, atau data pribadi. Hal ini dapat mengurangi nilai.
- Sediakan `.env.example` berisi nama variabel tanpa nilai rahasia, dan masukkan `.env` ke `.gitignore`.
- Jika sudah terlanjur ter-commit, **cabut/ganti** kredensial tersebut. Menghapus commit saja tidak cukup.
- Data uji/seed harus berupa data fiktif.

## A.4 Struktur Folder

Seluruh kode ditempatkan di `src/` pada repo fork. Jangan mengubah folder milestone lama.

```
src/                              # SELURUH kode implementasi
	README.md                     # dokumentasi utama aplikasi (lihat A.5)
	.env.example                  # jika memakai environment variable
	<struktur kode kalian>        # bebas, mengikuti pola arsitektur DPPL
	tests/                        # test case 
docs/
	M9/
		K02_G07_Implementasi.md   # laporan ini (Bagian B)
		K02_G07_Form-Asistensi.md
```

Catatan:
- `README.md` aplikasi diletakkan di **`src/README.md`**, bukan di root repo.
- Jika kerangka kerja kalian mewajibkan struktur tertentu (misalnya Maven `src/main/java`, Flutter `lib/`, monorepo `frontend/` dan `backend/`), letakkan semuanya **di dalam `src/`**.
- Nama file dan folder pada `docs/M9/` mengikuti aturan penamaan milestone sebelumnya (`KXX_GYY_...`).

## A.5 Isi Minimal `src/README.md`

README harus cukup bagi orang yang belum pernah melihat proyek kalian untuk menjalankan aplikasi dari nol. Minimal berisi:

1. **Deskripsi singkat** aplikasi.
2. **Teknologi yang digunakan** beserta versi (bahasa, framework, basis data).
3. **Prasyarat dan instalasi** (software yang harus ada, perintah instalasi dependensi).
4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.
5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).
6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

## A.6 Best Practices

Kalian dianjurkan menerapkan praktik berikut. Bukti penerapannya dirangkum pada Bagian B.2.

### 1. Branching
Sesuai aturan umum di README repository, `main` fork kelompok dijaga agar tetap bisa menerima sync dari asisten. Pada tugas ini **sangat disarankan** memakai branch per fitur dengan format `<tipe>/<nama-fitur>` (contoh: `feat/login-page`, `fix/null-cart`), lalu digabungkan ke `main` melalui Pull Request. Skema Gitflow penuh (dengan `develop`) boleh dipakai, tetapi tidak diwajibkan.

### 2. Semantic Commit
Gunakan format `<tipe>(<scope>): <deskripsi>`, misalnya `feat(auth): tambah validasi email`.

| Tipe | Kegunaan |
| :--- | :--- |
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `style` | Perubahan format/spasi, tanpa mengubah logika |
| `refactor` | Perubahan kode yang tidak menambah fitur atau memperbaiki bug |
| `test` | Menambah/memperbaiki pengujian |
| `chore` | Tugas rutin (build, dependensi, konfigurasi) |

### 3. Track Tasks
Gunakan **GitHub Issues** (dan opsional GitHub Projects) untuk membagi tugas dan melacak progres.
- Pecah fitur besar menjadi issue yang lebih kecil dan tetapkan penanggung jawabnya.
- Hubungkan PR dengan issue (`Closes #12`) dan tutup issue ketika selesai.

### 4. Pull Request dan Code Review
- Setiap PR berisi penjelasan deskriptif tentang apa yang dikerjakan, beserta bukti (tangkapan layar/rekaman/hasil test).
- Setiap PR di-*review* minimal **1 anggota lain**, dengan komentar konstruktif atau approval.

### 5. Pengujian dan Optimasi Performa
- Tulis pengujian untuk logika inti (unit test dan/atau pengujian alur utama). Cakupan penuh tidak diwajibkan, tetapi pengujian pada logika utama dinilai.
- Lakukan **profiling** pada setidaknya satu fitur yang berat (query besar, proses pengolahan data, render list panjang, dsb.), lalu catat temuan dan perbaikannya. Contoh alat:

| Platform | Contoh alat |
| :--- | :--- |
| Web (frontend) | Chrome DevTools (Performance/Network), Lighthouse |
| Web (backend) | Profiler bawaan bahasa, `EXPLAIN` pada query basis data, logging waktu respons |
| Python | `cProfile`, `PyInstrument` |
| Java | VisualVM, JProfiler |
| Mobile | Android Studio Profiler, Flutter DevTools, Xcode Instruments |

### 6. Penggunaan AI
Penggunaan AI **tetap harus dicatat** pada `docs/KXX_GYY_AI-Usage.md` sesuai ketentuan yang sudah berlaku.

## A.7 Pengumpulan

Pengumpulan dinilai dari **tag release**, bukan commit terakhir.

1. Pastikan seluruh pekerjaan sudah di-*commit* dan di-*push* ke `main` fork kelompok.
2. Buat release dengan tag **`v9.0`** (revisi berikutnya `v9.1`, `v9.2`, dst.) dengan target branch `main`.
3. Yang dinilai adalah **tag terakhir yang dibuat sebelum deadline**.

## A.8 Aturan Tanya Jawab

Agar semua kelompok mendapat jawaban yang sama, pertanyaan dibagi menjadi dua jalur:

| Jenis Pertanyaan | Jalur |
| :--- | :--- |
| **Ketentuan tugas**, misalnya teknologi yang diperbolehkan, struktur folder, format pengumpulan, dan penilaian | **Sheets QnA:** *[tautan sheets QnA]* |
| **Kendala teknis kelompok sendiri**, misalnya error, setup, dan penggunaan git | Grup kelompok bersama asisten masing-masing |

Ketentuan:
1. Pertanyaan tentang ketentuan tugas **wajib** diajukan melalui Sheets QnA. Periksa terlebih dahulu apakah pertanyaan serupa sudah dijawab.
2. Jika pertanyaan tentang ketentuan tugas tetap diajukan langsung kepada asisten kelompok, asisten **berhak menolak menjawab** dan meminta kelompok memasukkan pertanyaannya ke Sheets QnA.
3. Jika pertanyaan di Sheets QnA **belum dijawab dalam 24 jam**, kelompok boleh menghubungi asisten kelompok masing-masing. Cantumkan pertanyaan yang sudah diajukan di sheets tersebut.
4. Jawaban pada Sheets QnA berlaku untuk **seluruh kelompok** dan menjadi acuan jika terjadi perbedaan pemahaman.

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Catat semua perbedaan antara perancangan (DPPL) dan implementasi akhir. Jika tidak ada perubahan, tuliskan "Tidak ada perubahan".

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Kelas C01 `PemilikUsaha` – penyimpanan password (Bab 5.1) | Password di-hash melalui `HASH_FUNCTION` dan hasilnya disimpan dalam atribut `password_hash` pada tabel `tbl_pemilik_usaha`. Tersedia operasi `getPassword()` untuk mengambil hash. | Autentikasi dan penyimpanan password dikelola oleh Supabase Auth. Tabel `tbl_pemilik_usaha` hanya menyimpan profil pengguna tanpa kolom `password_hash`. Operasi `getPassword()` tidak diimplementasikan. | Supabase Auth sudah menyediakan mekanisme penyimpanan dan verifikasi password sehingga aplikasi tidak perlu mengelola hash password secara mandiri. |
| 2 | Kelas C01 `PemilikUsaha` – `createUser()` (Bab 5.1) | Registrasi melakukan `INSERT` langsung ke `tbl_pemilik_usaha` melalui `DB_SERVICE` setelah password di-hash. | `createUser()` menggunakan `supabase.auth.signUp()` untuk membuat akun. Setelah akun dibuat pada `auth.users`, trigger `on_auth_user_created` menjalankan `handle_new_user()` untuk membuat profil pada `tbl_pemilik_usaha`. | Memisahkan pengelolaan kredensial dari data profil dan memastikan integrasi dengan sistem autentikasi Supabase. |
| 3 | Basis data `tbl_pemilik_usaha` (Bab 5.1) | Identitas akun menggunakan username dan tabel menyimpan data autentikasi serta profil pengguna. | Ditambahkan kolom `id` bertipe UUID sebagai primary key sekaligus foreign key ke `auth.users(id)`. Username dan email disimpan sebagai data profil dengan unique index yang tidak membedakan huruf besar dan kecil. | Menggunakan identitas unik dari Supabase Auth agar hubungan antartabel konsisten dan mendukung Row Level Security. |
| 4 | Kelas C06 `AuthController` – `validateData()` (Bab 5.6) | Validasi registrasi dan login dilakukan melalui satu operasi yang mengakses `DB_SERVICE`, termasuk pemeriksaan password menggunakan `COMPARE_HASH`. | `validateData()` tetap digunakan sebagai antarmuka utama, tetapi proses registrasi dan login dipisahkan secara internal. Validasi input menggunakan fungsi pada `validators.ts`, pemeriksaan akun menggunakan Supabase, dan verifikasi password menggunakan Supabase Auth. | Memisahkan validasi input dari autentikasi dan akses data sehingga implementasi lebih mudah dipelihara serta diuji. |
| 5 | Kelas C06 `AuthController` – login menggunakan username (Bab 5.6) | Sistem membaca informasi akun, termasuk `password_hash`, dari `tbl_pemilik_usaha`, kemudian membandingkan password menggunakan `COMPARE_HASH`. | Login menggunakan username dilakukan melalui Supabase Edge Function `login-with-username`. Function mencari email terkait menggunakan akses server, lalu memverifikasi password melalui Supabase Auth dan mengembalikan token sesi apabila berhasil. | Supabase Auth menggunakan email dan password untuk autentikasi. Edge Function memungkinkan login berdasarkan username tanpa menyediakan RPC publik yang mengembalikan email pengguna. |
| 6 | Kelas C05 `RegistrationPage` (Bab 5.5) | Halaman registrasi dirancang sebagai kelas dengan atribut input serta operasi `submitForm()`, `displaySuccess()`, dan `displayError()`. | Diimplementasikan sebagai komponen fungsional React Native. Atribut input menjadi state melalui `useState`. Ditambahkan input konfirmasi password, pengaturan visibilitas password, indikator loading, dan pesan validasi. | Mengikuti pendekatan deklaratif React Native dan menyesuaikan implementasi dengan rancangan UI serta kebutuhan validasi form. |
| 7 | Kelas C07 `LoginPage` (Bab 5.7) | Input login menggunakan atribut `usernameInput` dan `passwordInput`. Operasi login, navigasi, dan penampilan kesalahan merupakan operasi kelas. | Diimplementasikan sebagai komponen fungsional React Native. Input pengguna menggunakan `identifierInput` yang menerima username atau email. Navigasi menggunakan React Navigation dan pesan kesalahan ditampilkan berdasarkan state komponen. | Menyesuaikan antarmuka yang mendukung login menggunakan username atau email serta mengikuti pendekatan komponen React Native. |
| 8 | Navigasi dan pengelolaan sesi | DPPL menjelaskan perpindahan antarlayar menggunakan operasi navigasi seperti `NAVIGATOR.goTo()` tanpa menentukan library atau mekanisme persistensi sesi. | Menggunakan React Navigation dengan native stack. `App.tsx` memeriksa sesi Supabase dan mendengarkan perubahan autentikasi untuk menentukan tampilan Login/Register atau Home. Sesi disimpan melalui AsyncStorage. | Menyediakan navigasi sesuai dengan React Native serta mempertahankan sesi pengguna ketika aplikasi dibuka kembali. |
| 9 | Kelas C01 `PemilikUsaha` – pembaruan profil (Bab 5.1) | Pembaruan data profil dilakukan melalui `DB_SERVICE` dengan identitas pengguna berdasarkan username. | Operasi pembaruan data profil menggunakan Supabase client dengan identitas pengguna yang sedang login. Pembaruan password menggunakan Supabase Auth. Perubahan email memerlukan penyesuaian dengan mekanisme verifikasi email Supabase. | Mengikuti sistem autentikasi dan pembatasan akses data per pengguna serta menghindari inkonsistensi antara data autentikasi dan profil. |
| 10 | Kelas C02 `Produk` (Bab 5.2) | Atribut `namaProduk`, `tag`, `hargaJual`, `margin`. | Ditambah atribut `hasilResep` beserta `getHasilResep()` dan `setHasilResep()` (bilangan bulat positif). | Rancangan antarmuka I-06 (objek I-06-06) memuat kolom "Hasil resep (porsi)" dan HPP dihitung per porsi. |
| 11 | Kelas C03 `BahanBaku` (Bab 5.3) | Atribut `namaBahan` dan `hargaBeli`. | Ditambah atribut `satuan` beserta `getSatuan()` dan `setSatuan()`. | Antarmuka I-06 (I-06-09, I-06-10) menampilkan takaran dan harga per satuan bahan agar HPP dihitung dengan satuan yang sama. |
| 12 | Kelas C04 `ResepBahan` (Bab 5.4) | Hanya atribut `takaran`. | Ditambah operasi `getBahan()` yang menunjuk objek `BahanBaku`. | Relasi asosiasi pada class diagram diwujudkan sebagai properti agar biaya tiap bahan dapat dihitung. |
| 13 | Kelas C10 `AddProductPage` (Bab 5.10) | Form dua tahap: nama dan tag, kemudian bahan baku dan harga jual; hasil berupa pesan. | Satu halaman sesuai I-06 dengan dropdown tag dan bahan, kolom porsi, panel total biaya dan HPP per porsi, dialog preview, serta kartu produk hasil. `showSuccessMessage` menerima data hasil, bukan pesan string. | Menyesuaikan implementasi dengan rancangan antarmuka I-06. |
| 14 | Kelas C11 `MarginController` (Bab 5.11) | `validasiInput(daftarBahan, hargaJual)` memvalidasi sekaligus menyimpan produk. | `validasiInput(input)` hanya memvalidasi dan menghitung preview (HPP per porsi, margin, persentase). Penyimpanan dipindah ke operasi baru `simpanProduk()` yang memanggil `simpanProdukBaru()` dan `simpanResep()`. Ditambah `getDaftarBahan()` dan `getCurrentProduk()`. | Dialog preview (I-06-15 sampai I-06-19) mengharuskan pengguna mengonfirmasi sebelum data disimpan. |
| 15 | Rumus HPP (Bab 5.11) | HPP = jumlah (takaran × harga beli). | HPP per porsi = jumlah (takaran × harga beli) dibagi hasil resep; margin = harga jual per porsi dikurangi HPP per porsi. | Sesuai panel I-06-13 dan I-06-14. **Perlu konfirmasi bahwa tim menyetujui rumus ini.** |
| 16 | Pembuatan bahan baku | Bahan baku dipilih dari yang sudah ada atau dibuat bila belum ada. | Dropdown memuat bahan yang sudah ada dan opsi "+ Bahan baru"; bahan baru wajib diisi nama, harga beli, dan satuan. Bahan dengan nama yang sudah ada ditolak dan harus dipilih dari daftar. | Belum ada use case yang menambah bahan baku, dan harga bahan yang sudah ada tidak boleh tertimpa karena perubahannya ditangani UC10. |
| 17 | Basis data tabel `tbl_produk`, `tbl_bahan_baku`, `tbl_resep_bahan` (Bab 5) | Kunci kepemilikan mengacu pada `username`. | Kolom `id_pemilik` bertipe `uuid` yang merujuk `tbl_pemilik_usaha.id`; ditambah kolom `hasil_resep` dan `satuan`; Row Level Security aktif pada ketiga tabel. | Kunci `uuid` dari Supabase Auth lebih stabil dan diperlukan untuk kebijakan RLS. |
| 18 | Akses basis data (Bab 5.11) | Query melalui `DB_SERVICE`. | Query dijalankan langsung dari controller memakai klien Supabase (`src/services/supabase.ts`). | Mengikuti pola yang sudah dipakai `PemilikUsaha` dan `AuthController`. |


## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Branch Repository](https://github.com/rafeldzin/IF2150-RPL-K02-G07/branches) | *Kelompok menerapkan skema GitHub Flow (Feature Branch Workflow), yaitu pengembangan setiap fitur dilakukan pada branch terpisah yang dibuat dari `main`.* |
| Semantic commit | [Riwayat Commit](https://github.com/rafeldzin/IF2150-RPL-K02-G07/commits/main/) | *Menggunakan pesan commit deskriptif dengan tipe seperti `feat`, `fix`, `docs`, dan `chore`. Setiap commit dipisahkan berdasarkan perubahan yang dilakukan, seperti inisialisasi proyek Expo, konfigurasi Supabase, implementasi autentikasi, UI, dan dokumentasi.* |
| Track tasks | [GitHub Issues](https://github.com/rafeldzin/IF2150-RPL-K02-G07/issues) | *22 Issues* <br> *- Kevin: 4* <br> *- Klio: 3* <br> *- Kuri: 4* <br> *- Botros: 4* <br> *- Rafel: 5* <br> *- Nuha: 2*|
| Pull request dan review | [PR #23 - feat/auth uc01 uc02](https://github.com/rafeldzin/IF2150-RPL-K02-G07/pull/23) <br> [PR #24 - feat/produk margin](https://github.com/rafeldzin/IF2150-RPL-K02-G07/pull/24) | *Klio review Kevin* <br> *Kuri review Klio* |
| Pengujian | [src/test](https://github.com/rafeldzin/IF2150-RPL-K02-G07/tree/main/src/tests) <br> [Bukti Pengujian](https://github.com/rafeldzin/IF2150-RPL-K02-G07/tree/main/docs/M9/test_pengujian) | *Pengujian otomatis menggunakan Vitest dengan menjalankan `npm test` pada direktori `src/` untuk menguji fungsi validasi email, password, dan konfirmasi password. Pengujian manual dilakukan melalui aplikasi Android yang dijalankan dengan `npx expo start`. Skenario yang diuji meliputi registrasi berhasil, validasi registrasi gagal, login menggunakan email dan username, serta penanganan login dengan password salah.* |

### B.2.1 Profiling dan Optimasi

Pilih minimal satu fitur yang diprofil.

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | *[Nama fitur]* |
| Alat | *[mis. Chrome DevTools, cProfile, EXPLAIN]* |
| Temuan (sebelum) | *[Bottleneck yang ditemukan, sertakan angka/tangkapan layar]* |
| Perbaikan | *[Yang diubah]* |
| Hasil (sesudah) | *[Perbandingan dengan sebelumnya]* |

Jika tidak ada perbaikan yang perlu dilakukan, jelaskan hasil profiling dan alasan kenapa fitur tersebut sudah memadai.

## B.3 Kendala dan Catatan Penting

Tuliskan kendala yang ditemui, fitur yang belum sempurna (*known issues*), serta hal yang perlu diketahui asisten saat menjalankan atau menilai aplikasi (misalnya akun uji khusus, urutan menjalankan, atau batasan).
- Rancangan autentikasi pada DPPL menggunakan penyimpanan dan verifikasi `password_hash` secara mandiri, sedangkan implementasi menggunakan Supabase Auth. Oleh karena itu, tabel `tbl_pemilik_usaha` hanya menyimpan data profil, sementara password dikelola oleh Supabase Auth.
- Supabase Auth tidak menyediakan login menggunakan username secara langsung. Untuk mendukung UC02, dibuat Edge Function `login-with-username` yang mencari email berdasarkan username dan melakukan autentikasi melalui Supabase Auth.
- Login menggunakan username bergantung pada konfigurasi `PROSS_PUBLISHABLE_KEY` dan `PROSS_SECRET_KEY` di Supabase Function Secrets. Nama dan format environment variable harus sesuai dengan yang digunakan pada Edge Function.
- Pembuatan profil pengguna setelah registrasi menggunakan trigger `on_auth_user_created`. Oleh karena itu, `src/supabase/schema.sql` harus dijalankan terlebih dahulu agar registrasi dan penyimpanan profil dapat berjalan dengan benar.
- Konfigurasi konfirmasi email pada Supabase memengaruhi alur registrasi. Untuk pengujian yang mengharuskan pengguna dapat langsung login setelah registrasi, pengaturan konfirmasi email perlu disesuaikan melalui dashboard Supabase.
- Pemeriksaan TypeScript aplikasi menggunakan konfigurasi Expo/React Native, sedangkan Supabase Edge Function menggunakan Deno. Oleh karena itu, source Edge Function perlu diperiksa secara terpisah agar tidak menimbulkan kesalahan tipe terkait runtime Deno.
- Beberapa dependency Expo memerlukan penyesuaian versi agar kompatibel dengan SDK yang digunakan. Pemeriksaan dilakukan menggunakan `npx expo-doctor` dan penyesuaian melalui `npx expo install --fix`.
- Halaman Home pada implementasi awal masih berupa kerangka untuk integrasi fitur anggota lain. Halaman Reset Password juga masih berupa placeholder dan belum mencakup implementasi lengkap C08/C09.
- Aplikasi memerlukan konfigurasi project Supabase, database, dan Edge Function sebelum dapat dijalankan secara penuh. Langkah konfigurasi tersebut didokumentasikan pada `src/README.md` agar aplikasi dapat dijalankan ulang tanpa menggunakan akun pribadi pengembang.
- Rancangan I-06 memuat porsi dan satuan, tetapi class diagram C02 dan C03 belum memuatnya. 
- Belum ada layar untuk mengelola bahan baku (mengubah atau menghapus). Bahan baru hanya dapat dibuat dari formulir Tambah Produk.
- Penyimpanan produk dan resep tidak berada dalam satu transaksi basis data. Bila penyimpanan resep gagal, produk yang sudah tersimpan dihapus kembali oleh `MarginController`.
- Margin dihitung saat produk dibuat dan diperbarui oleh `NotificationController` ketika harga bahan baku berubah.
- Pilihan tag bersifat tetap (Makanan utama, Camilan, Minuman, Dessert, Lainnya) pada `DAFTAR_TAG` di `src/models/Produk.ts`.


## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| *13525020* | *Klio Lysander* | *UC03 (Menambahkan Produk) dan UC04 (Melihat Margin Produk): model `Produk`, `BahanBaku`, `ResepBahan`, `MarginController` dan fungsi perhitungan margin, layar Tambah Produk (I-06) beserta komponen pilihan, migrasi dan data contoh tabel produk, bahan baku, dan resep, unit test (36 test). Meninjau PR untuk UC01 dan UC02.* | *16,67%* |
| 13525053 | Kevin Sie | UC01 (Mendaftarkan Akun) dan UC02 (Login dengan Akun yang Sudah Terdaftar): model C01 `PemilikUsaha`, controller C06 `AuthController`, halaman C05 `RegistrationPage`, dan C07 `LoginPage`. Menyusun fungsi validasi dan unit test, integrasi Supabase Auth, Edge Function untuk login username, serta database `tbl_pemilik_usaha`. Menyiapkan fondasi aplikasi Expo/React Native dengan TypeScript, struktur MVC, navigasi, pengelolaan sesi, konfigurasi environment, dan dokumentasi setup pada `src/README.md`. Mengajukan implementasi melalui PR #23. | *16,67%* |
| *...* | *...* | *...* | *...* |

## B.5 Traceability Kelas Perancangan ke Implementasi

Pemetaan dari **setiap kelas perancangan** pada DPPL (Tabel 4.1) ke wujud implementasinya. Bentuk implementasi bebas (kelas, fungsi, komponen, *route/handler*, *stored procedure*, skrip, dsb.), tetapi tiap kelas perancangan harus muncul pada tabel ini. Jika implementasi berupa kelas dengan nama yang sama, tetap dicantumkan.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | PemilikUsaha | Kelas TypeScript, integrasi Supabase Auth, dan tabel PostgreSQL | `src/models/PemilikUsaha.ts` – `PemilikUsaha`; `src/supabase/schema.sql` – `tbl_pemilik_usaha`, `handle_new_user()`, `account_exists()` | Registrasi menggunakan `supabase.auth.signUp()` dan trigger pembentukan profil. Getter dan setter data profil diwujudkan pada model. Password tidak disimpan dalam tabel profil dan `getPassword()` tidak diimplementasikan. Perubahan dari DPPL dijelaskan pada B.1. |
| C02 | Produk | Kelas | `src/models/Produk.ts` – `Produk` | Atribut menjadi properti private dengan getter dan setter sesuai DPPL. `setTag` menormalisasi tag; `setMargin` menerima nilai negatif. Ditambah `hasilResep` dan konstanta `DAFTAR_TAG` untuk pilihan tag. |
| C03 | BahanBaku | Kelas | `src/models/BahanBaku.ts` – `BahanBaku` | `namaBahan` diisi melalui konstruktor; `setHargaBeli` menolak nilai non-positif. Ditambah atribut `satuan`. |
| C04 | ResepBahan | Kelas | `src/models/ResepBahan.ts` – `ResepBahan` | `takaran` divalidasi pada setter; konstruktor menerima objek `BahanBaku` yang dapat diambil lewat `getBahan()`. |
| C05 | RegistrationPage | Komponen fungsional React Native | `src/views/RegistrationPage.tsx` – `RegistrationPage` | Atribut input pada DPPL diwujudkan sebagai state React. `submitForm()` memanggil `AuthController.validateData()` untuk melakukan registrasi. Pesan berhasil, pesan kesalahan, validasi input, dan status loading ditampilkan melalui state. Ditambahkan konfirmasi password dan pengaturan visibilitas password. |
| C06 | AuthController | Kelas TypeScript, fungsi validasi, dan layanan autentikasi server | `src/controllers/AuthController.ts` – `AuthController`; `src/controllers/validators.ts`; `src/supabase/functions/login-with-username/index.ts` | `validateData()` mempertahankan peran pengendali registrasi dan login. Validasi input dipisahkan menjadi fungsi yang dapat diuji. Login email menggunakan Supabase Auth, sedangkan login username menggunakan Edge Function. Verifikasi password tidak dilakukan melalui pembacaan hash dari tabel profil. |
| C07 | LoginPage | Komponen fungsional React Native | `src/views/LoginPage.tsx` – `LoginPage`; rute `Login` pada `src/navigation/types.ts` dan `src/App.tsx` | `usernameInput` pada rancangan diwujudkan sebagai state `identifierInput` yang mendukung username atau email. `login()` menjadi fungsi asinkron yang memanggil `AuthController`. Navigasi ke Reset Password menggunakan React Navigation, sedangkan pesan kesalahan ditampilkan berdasarkan state komponen. |
| C10 | AddProductPage | Komponen React Native | `src/views/AddProductPage.tsx` – `AddProductPage`; `src/views/PilihanModal.tsx` – `PilihanModal`; rute `AddProduct` pada `src/navigation/types.ts` dan `src/App.tsx` | Atribut `inputNamaProduk`, `inputTag`, `inputTakaran`, dan `inputHargaJual` menjadi state komponen (ditambah `inputHasilResep`); isian disimpan sebagai teks lalu dikonversi ke angka. Operasi `showPage`, `getInput`, `showErrorMessage`, dan `showSuccessMessage` menjadi fungsi di dalam komponen dengan nama yang sama. Tombol "+ Tambah Produk" berada pada `HomePage.tsx`. |
| C11 | MarginController | Kelas | `src/controllers/MarginController.ts` – `MarginController`; `src/controllers/margin.ts` (fungsi perhitungan) | Atribut `currentProduk` dan `currentResep` menjadi properti private. Keempat operasi DPPL diwujudkan sebagai method; ditambah `simpanProduk`, `getDaftarBahan`, dan `getCurrentProduk`. Perhitungan (`hitungHpp`, `hitungMargin`, `hitungPersenMargin`) berupa fungsi murni di `margin.ts` agar dapat diuji dan dipakai fitur lain. Tabel pendukung: `supabase/migrations/20261103000000_produk_bahan_resep.sql` dan `20261105000001_porsi_satuan.sql`. |
| *...* | *...* | *...* | *...* | *...* |

Catatan:
- Satu kelas perancangan boleh diwujudkan oleh beberapa file/unit, dan satu file/unit boleh mewujudkan beberapa kelas perancangan. Tuliskan semuanya.
- Kelas perancangan yang **tidak diimplementasikan** atau **digabung/dipecah** tetap dicantumkan, dan alasannya dicatat di Bagian B.1.
