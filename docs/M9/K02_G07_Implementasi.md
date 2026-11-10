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
| 1 | *[mis. Kelas C05, layar I-03, tabel `orders`]* | *[Yang direncanakan]* | *[Yang dibuat]* | *[Alasan perubahan]* |
| *[2]* | *Kelas C02 `Produk` (Bab 5.2)* | *Atribut `namaProduk`, `tag`, `hargaJual`, `margin`* | *Ditambah atribut `hasilResep` beserta `getHasilResep()` dan `setHasilResep()` (bilangan bulat positif)* | *Rancangan antarmuka I-06 (objek I-06-06) memuat kolom "Hasil resep (porsi)" dan HPP dihitung per porsi* |
| *[3]* | *Kelas C03 `BahanBaku` (Bab 5.3)* | *Atribut `namaBahan` dan `hargaBeli`* | *Ditambah atribut `satuan` beserta `getSatuan()` dan `setSatuan()`* | *Antarmuka I-06 (I-06-09, I-06-10) menampilkan takaran dan harga per satuan bahan agar HPP dihitung dengan satuan yang sama* |
| *[4]* | *Kelas C04 `ResepBahan` (Bab 5.4)* | *Hanya atribut `takaran`* | *Ditambah operasi `getBahan()` yang menunjuk objek `BahanBaku`* | *Relasi asosiasi pada class diagram diwujudkan sebagai properti agar biaya tiap bahan dapat dihitung* |
| *[5]* | *Kelas C10 `AddProductPage` (Bab 5.10)* | *Form dua tahap: nama dan tag, kemudian bahan baku dan harga jual; hasil berupa pesan* | *Satu halaman sesuai I-06 dengan dropdown tag dan bahan, kolom porsi, panel total biaya dan HPP per porsi, dialog preview, serta kartu produk hasil. `showSuccessMessage` menerima data hasil, bukan pesan string* | *Menyesuaikan implementasi dengan rancangan antarmuka I-06* |
| *[6]* | *Kelas C11 `MarginController` (Bab 5.11)* | *`validasiInput(daftarBahan, hargaJual)` memvalidasi sekaligus menyimpan produk* | *`validasiInput(input)` hanya memvalidasi dan menghitung preview (HPP per porsi, margin, persentase). Penyimpanan dipindah ke operasi baru `simpanProduk()` yang memanggil `simpanProdukBaru()` dan `simpanResep()`. Ditambah `getDaftarBahan()` dan `getCurrentProduk()`* | *Dialog preview (I-06-15 sampai I-06-19) mengharuskan pengguna mengonfirmasi sebelum data disimpan* |
| *[7]* | *Rumus HPP (Bab 5.11)* | *HPP = jumlah (takaran x harga beli)* | *HPP per porsi = jumlah (takaran x harga beli) dibagi hasil resep; margin = harga jual per porsi dikurangi HPP per porsi* | *Sesuai panel I-06-13 dan I-06-14. [konfirmasi bahwa tim menyetujui rumus ini]* |
| *[8]* | *Pembuatan bahan baku* | *Bahan baku dipilih dari yang sudah ada atau dibuat bila belum ada* | *Dropdown memuat bahan yang sudah ada dan opsi "+ Bahan baru"; bahan baru wajib diisi nama, harga beli, dan satuan. Bahan dengan nama yang sudah ada ditolak dan harus dipilih dari daftar* | *Belum ada use case yang menambah bahan baku, dan harga bahan yang sudah ada tidak boleh tertimpa karena perubahannya ditangani UC10* |
| *[9]* | *Basis data tabel `tbl_produk`, `tbl_bahan_baku`, `tbl_resep_bahan` (Bab 5)* | *Kunci kepemilikan mengacu pada `username`* | *Kolom `id_pemilik` bertipe `uuid` yang merujuk `tbl_pemilik_usaha.id`; ditambah kolom `hasil_resep` dan `satuan`; Row Level Security aktif pada ketiga tabel* | *Kunci `uuid` dari Supabase Auth lebih stabil dan diperlukan untuk kebijakan RLS* |
| *[10]* | *Akses basis data (Bab 5.11)* | *Query melalui `DB_SERVICE`* | *Query dijalankan langsung dari controller memakai klien Supabase (`src/services/supabase.ts`)* | *Mengikuti pola yang sudah dipakai `PemilikUsaha` dan `AuthController`* |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | *https://github.com/rafeldzin/IF2150-RPL-K02-G07/branches* | *Feature Branch* |
| Semantic commit | *https://github.com/rafeldzin/IF2150-RPL-K02-G07/commits/main/* | *[Ringkasan]* |
| Track tasks | *https://github.com/rafeldzin/IF2150-RPL-K02-G07/issues* | *22 Issues* <br> *- Kevin: 4* <br> *- Klio: 3* <br> *- Kuri: 4* <br> *- Botros: 4* <br> *- Rafel: 5* <br> *- Nuha: 2*|
| Pull request dan review | *https://github.com/rafeldzin/IF2150-RPL-K02-G07/pull/23* <br> *https://github.com/rafeldzin/IF2150-RPL-K02-G07/pull/24* | *Klio review Kevin* <br> *Kuri review Klio* |
| Pengujian | *https://github.com/rafeldzin/IF2150-RPL-K02-G07/tree/main/src/tests* | *[Apa yang diuji, cara menjalankan] BAGIAN BUKTI PERLU TUNJUKIN HASIL PENGUJIAN JANGAN LUPA* |

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
| *...* | *...* | *...* | *...* |

## B.5 Traceability Kelas Perancangan ke Implementasi

Pemetaan dari **setiap kelas perancangan** pada DPPL (Tabel 4.1) ke wujud implementasinya. Bentuk implementasi bebas (kelas, fungsi, komponen, *route/handler*, *stored procedure*, skrip, dsb.), tetapi tiap kelas perancangan harus muncul pada tabel ini. Jika implementasi berupa kelas dengan nama yang sama, tetap dicantumkan.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| *C02* | *Produk* | *Kelas* | *`src/models/Produk.ts` - `Produk`* | *Atribut menjadi properti private dengan getter dan setter sesuai DPPL. `setTag` menormalisasi tag; `setMargin` menerima nilai negatif. Ditambah `hasilResep` dan konstanta `DAFTAR_TAG` untuk pilihan tag.* |
| *C03* | *BahanBaku* | *Kelas* | *`src/models/BahanBaku.ts` - `BahanBaku`* | *`namaBahan` diisi melalui konstruktor; `setHargaBeli` menolak nilai non-positif. Ditambah atribut `satuan`.* |
| *C04* | *ResepBahan* | *Kelas* | *`src/models/ResepBahan.ts` - `ResepBahan`* | *`takaran` divalidasi pada setter; konstruktor menerima objek `BahanBaku` yang dapat diambil lewat `getBahan()`.* |
| *C10* | *AddProductPage* | *Komponen React Native* | *`src/views/AddProductPage.tsx` - `AddProductPage`; `src/views/PilihanModal.tsx` - `PilihanModal`; rute `AddProduct` pada `src/navigation/types.ts` dan `src/App.tsx`* | *Atribut `inputNamaProduk`, `inputTag`, `inputTakaran`, dan `inputHargaJual` menjadi state komponen (ditambah `inputHasilResep`); isian disimpan sebagai teks lalu dikonversi ke angka. Operasi `showPage`, `getInput`, `showErrorMessage`, dan `showSuccessMessage` menjadi fungsi di dalam komponen dengan nama yang sama. Tombol "+ Tambah Produk" berada pada `HomePage.tsx`.* |
| *C11* | *MarginController* | *Kelas* | *`src/controllers/MarginController.ts` - `MarginController`; `src/controllers/margin.ts` (fungsi perhitungan)* | *Atribut `currentProduk` dan `currentResep` menjadi properti private. Keempat operasi DPPL diwujudkan sebagai method; ditambah `simpanProduk`, `getDaftarBahan`, dan `getCurrentProduk`. Perhitungan (`hitungHpp`, `hitungMargin`, `hitungPersenMargin`) berupa fungsi murni di `margin.ts` agar dapat diuji dan dipakai fitur lain. Tabel pendukung: `supabase/migrations/20261103000000_produk_bahan_resep.sql` dan `20261105000001_porsi_satuan.sql`.* |
| *...* | *...* | *...* | *...* | *...* |

Catatan:
- Satu kelas perancangan boleh diwujudkan oleh beberapa file/unit, dan satu file/unit boleh mewujudkan beberapa kelas perancangan. Tuliskan semuanya.
- Kelas perancangan yang **tidak diimplementasikan** atau **digabung/dipecah** tetap dicantumkan, dan alasannya dicatat di Bagian B.1.
