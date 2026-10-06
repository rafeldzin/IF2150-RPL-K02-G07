<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 6
<br>
ARSITEKTUR PERANGKAT LUNAK (APL)
</h1>
<br>

## *Pross*

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

<br>
<br>

# BAB 1: Style/Pattern Arsitektur Acuan
Pattern arsitektur yang dipilih untuk perangkat lunak Pross adalah MVC. Pada pattern ini, model bertanggung jawab dalam merepresentasikan dan mengelola data utama sistem. View bertanggung jawab menampilkan antarmuka kepada pengguna atau meneruskan aksi pengguna ke Controller. Controller berguna untuk memproses logika bisnis, memvalidasi input dan memperbarui model berdasarkan permintaan dari view. 

Pemilihan MVC didasarkan karena karakteristik yang akan dibuat pada perangkat lunak Pross yaitu:
1. Satu objek pada Model yang sama akan dipakai bersama oleh beberapa View berbeda. Contoh: Pada data Produk diakses oleh AddProductPage saat sebuah produk dibuat, EditProductPage saat harga jual diubah, atau SearchProductpage saat produk suatu produk dicari
2. Alur proses bisnis perangkat lunak Pross hampir selalu dimulai dari input, proses, dan menampilkan yang berulang dari beberapa fitur, sehingga pemisahan tanggung jawab memudahkan untuk mengembangkan tiap fitur.
3. Perangkat lunak Pross hanya memiliki satu jenis pengguna sehingga kebutuhan antarmuka dapat relatif seragam.

<p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/MVC-diagram.png" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Arsitektur MVC</i>
</p>

Tabel 1.1. Lingkungan Operasi Perangkat Lunak

| Komponen | Spesifikasi |
| :--- | :--- |
| *Server* | *Localhost untuk keperluan pengujian dan pengembangan* |
| *Client* | *Aplikasi mobile* |
| *DBMS* | *Supabase* |
| *OS* | *Android* |

<sub><b><i>Catatan</i></b>: <i>Style/pattern yang dipilih di bab ini menjadi acuan untuk BAB 2 (pengelompokan komponen) dan BAB 3 (model arsitektur). Contoh pada dokumen ini memakai MVC secara konsisten dari BAB 1 sampai BAB 3. Kelompok boleh memakai pattern lain selama alasannya dijelaskan dan BAB 2 serta BAB 3 disesuaikan. Tabel 1.1 harus sama persis dengan subbab 2.5 dokumen SKPL; jangan menambah atau mengubah isinya karena SKPL sudah final.</i></sub>

---

# BAB 2: Identifikasi Komponen / Modul / Subsistem

Pada bagian ini, lakukan identifikasi terhadap komponen, modul, atau subsistem yang menyusun aplikasi berdasarkan *pattern* arsitektur yang telah ditetapkan sebelumnya. Setiap komponen memiliki tanggung jawab tertentu dalam mendukung fungsionalitas sistem.

Setiap komponen memiliki tanggung jawab tertentu dalam mendukung fungsionalitas sistem secara keseluruhan. Komponen dapat dikelompokkan berdasarkan lapisan arsitektur (misalnya *Model*, *View*, dan *Controller* pada pattern MVC), atau berdasarkan fungsi atau peran komponen di dalam sistem (misalnya modul autentikasi, manajemen data, dan integrasi eksternal).

Tabel 2.1. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis                 | Penjelasan                                                                                                           |
| :---------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
|*RegistrationPage*| *View* | *Menampilkan form untuk registrasi akun yang berisi username, email, serta password, setelah input akan diteruskan menuju AuthController.*     |
|*LoginPage*| *View*| *Menampilkan form untuk memasuki aplikasi menggunakan akun yang telah dibuat lalu memverifikasinya menuju AuthController, menyediakan opsi untuk mengubah password jika melupakannya.* |
| *ResetPasswordPage* | *View* | *Menampilkan form untuk reset password lalu diteruskan menuju ResetPasswordController.* | 
| *HomePage* | *View* | *Menampilkan halaman utama dari aplikasi dengan menunjukan beberapa menu seperti menambahkan product dan searching.* | 
| *AddProuctPage* | *View* | *Menampilkan halaman yang berisi form untuk menambahkan product yang nanti akan diteruskan menuju MarginController untuk dihitung Margin penjualannya.* |
| *EditProductPage* | *View* | *Menampilkan halaman yang berisi detail produk yang dapat pengguna ubah sesuai dengan keinginan lalu akan diteruskan menuju PriceController jika pengguna mengubah nilai harga jual dan disimpan pada RiwayatHargaJual* |
| *SearchProductPage* | *View* | *Menampilkan halaman setelah pengguna mencari sebuah barang atau mencari berdasarkan tag dan bahan baku.* |
| *PriceHistoryPage* | *View* | *Menampilkan riwayat harga jual dari sebuah produk.* |
| *ProfilePage* | *View* | *Menampilkan halaman yang berisi data akun dari pengguna serta tombol "logout" untuk keluar dari akun.* |
| *AuthController* | *Controller*| **|
| *ResetPasswordController* | *Controller*| **|
| *MarginController* | *Controller*| **|
| *PriceController* | *Controller*| **|
| *ProdductSearchController* | *Controller*| **|
| *TrenBahanBakuController* | *Controller*| **|
| *NotificationController* | *Controller*| **|
| *ProfileController* | *Controller*| **|
| *PemilikUsaha* | *Model* | ** |
| *Produk* | *Model* | ** |
| *BahanBaku* | *Model* | ** |
| *ResepBahan* | *Model* | ** |
| *RiwayatHargaBahanBaku* | *Model* | ** |
| *RiwayatHargaJual* | *Model* | ** |
| *Notifikasi* | *Model* | ** |
| *Database* | *Penyimpanan Data*    | *Menyimpan seluruh data model secara persisten, baik secara lokal maupun terpusat dengan menggunakan supabase.* |

Ketentuan pengisian Tabel 2.1:
1. Kolom **Jenis** mengikuti pengelompokan pada *style/pattern* di BAB 1. Untuk MVC, jenisnya adalah *Model*, *View*, dan *Controller*. Jenis lain boleh ditambahkan, misalnya *Pendukung* untuk komponen bantu yang dipakai bersama, atau *Integrasi Eksternal* untuk penghubung ke sistem di luar P/L yang disebutkan pada subbab 2.2 dokumen SKPL. Kolom ini juga boleh diisi dengan *Subsistem*, *Modul*, atau *Komponen* apabila komponen dikelompokkan berdasarkan fungsinya. Tuliskan subsistem terlebih dahulu, lalu komponen penyusunnya di baris-baris berikutnya.
2. Komponen **tidak sama dengan** kelas. Satu komponen boleh mewadahi beberapa kelas dari diagram kelas pada dokumen SKPL. Pastikan seluruh kelas tercakup oleh setidaknya satu komponen.
3. Pastikan seluruh use case pada dokumen SKPL dapat dijalankan oleh komponen-komponen yang didaftarkan di tabel ini. Jangan menambahkan komponen untuk fitur yang tidak ada di SKPL.

<sub><b><i>Catatan</i></b>: <i>Nama komponen pada Tabel 2.1 harus dipakai sama persis pada gambar di BAB 1 dan setiap view di BAB 3. Jika saat membuat view ternyata dibutuhkan komponen baru, tambahkan komponen tersebut ke Tabel 2.1 terlebih dahulu.</i></sub>

---

# BAB 3: Model Arsitektur Perangkat Lunak

*Architectural View* adalah bagaimana cara kita melihat/mendeskripsikan arsitektur sebuah sistem dari sudut pandang tertentu. Dalam perancangan arsitektur aplikasi, dibutuhkan *Architectural View* yang dapat mempermudah pemahaman dari proses aplikasi yang akan dikembangkan. Tujuan dari *Architectural View* adalah menjadi bahan komunikasi, pemisahan masalah, mempermudah analisis, dan pemandu saat eksekusi pengembangan sistem tersebut.

Buatlah model arsitektur dari aplikasi yang akan dirancang dalam bentuk *view*. Model arsitektur ini berfungsi untuk memperlihatkan bagaimana setiap komponen, modul, dan subsistem saling berinteraksi serta berkolaborasi dalam menjalankan fungsi utama sistem secara keseluruhan. Anda dapat membuat satu atau lebih *view* tergantung kebutuhan dalam bentuk gambar. Pilihlah notasi yang sesuai. Contoh *view* yang dapat digunakan antara lain ***Logical View***, ***Process View***, ***Development View***, serta ***Physical View***.

Ketentuan pengisian BAB 3:
1. Setiap view menggambarkan **keseluruhan sistem**, bukan satu use case atau satu fitur saja.
2. Buat **minimal satu view**. Setiap view dituliskan dalam subbab tersendiri (3.1, 3.2, dan seterusnya). Tidak perlu membuat keempat view, pilih yang paling membantu menjelaskan P/L Anda, lalu jelaskan alasan pemilihannya.
3. Setiap view harus **konsisten dengan BAB 2**. Seluruh komponen pada Tabel 2.1 harus muncul dengan nama yang sama, dan tidak boleh ada komponen pada view yang tidak terdaftar di Tabel 2.1.
4. Setiap view harus **mencerminkan style/pattern pada BAB 1**. Misalnya, jika memilih MVC, pembagian *Model*, *View*, dan *Controller* harus terlihat jelas pada diagram.
5. Jika membuat lebih dari satu view, setiap view harus menggambarkan sistem yang sama dari sudut pandang berbeda. View tambahan melengkapi view pertama, bukan mengulanginya.
6. Beri label pada setiap garis atau panah yang menghubungkan komponen agar hubungan antarkomponen dapat dipahami tanpa penjelasan tambahan.
7. Jika membuat *Physical View*, gambarkan lingkungan operasi pada Tabel 1.1.

## 3.1 XXX View

Tuliskan secara singkat mengenai model arsitektur perangkat lunak yang Anda pilih dan sertakan alasan mengapa model arsitektur tersebut cocok untuk aplikasi Anda.

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-logical-view.webp" width="100%">
</p>
<p align="center">
<i>Gambar 2. Contoh Logical View pada P/L E-Commerce</i>
</p>

Gambar 2 adalah contoh *Logical View* dalam bentuk *block diagram*. Seluruh komponen pada Tabel 2.1 digambarkan dan dikelompokkan sesuai pola MVC (*View*, *Controller*, *Model*), ditambah komponen pendukung dan basis data. Sistem di luar P/L, seperti *Payment Gateway (dummy)*, digambarkan dengan garis putus-putus dan tidak perlu dimasukkan ke Tabel 2.1. Setiap garis diberi label: "Memanggil" untuk *View* yang memanggil *Controller*, "akses" untuk *Controller* yang mengakses *Model*, serta agregasi dan komposisi untuk hubungan antar-*Model*.

<sub><b><i>Catatan</i></b>: <i>Ganti XXX dengan nama view yang dibuat, misalnya Logical View. Gambar 2 hanya contoh untuk P/L e-commerce, ganti dengan view milik kelompok Anda yang memuat seluruh komponen pada Tabel 2.1. Jenis view dan notasinya boleh berbeda dari contoh. Jika membuat view tambahan, lanjutkan pola 3.x ini (3.2, 3.3, dan seterusnya).</i></sub>

---

# Referensi

- Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson. Chapter 6: *Architectural Design*: [https://software-engineering-book.com/slides/](https://software-engineering-book.com/slides/)
- Diagram arsitektur: [https://www.drawio.com/](https://www.drawio.com/), [https://staruml.io/](https://staruml.io/)
