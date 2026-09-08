<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 2
<br>
REQUIREMENT GATHERING
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

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* | |
| *C* | |
| ... | |

<br>
<br>

# BAB 1: Deskripsi Umum

## 1.1 Deskripsi Umum Sistem

Abstraksikan sistem solusi menurut sudut pandang pengguna yang telah ditentukan. Jelaskan secara ringkas mengenai apa saja ekspektasi pengguna terhadap sistem yang akan dikembangkan, alur kerja sistem yang diinginkan, serta harapan dari penerapan solusi dalam bentuk narasi.

> *Sistem adalah kesatuan utuh antara perangkat lunak, pengguna, perangkat keras, dan proses bisnis (urutan langkah logis yang dilakukan di dunia nyata untuk menyelesaikan suatu pekerjaan atau mencapai tujuan tertentu).*

## 1.2 Deskripsi Pengguna Perangkat Lunak

Buatlah daftar seluruh aktor (pengguna) yang akan berinteraksi langsung dengan sistem solusi yang kalian kembangkan. Berikan penjelasan singkat mengenai peran dan karakteristik dari masing-masing aktor tersebut.

| Aktor | Deskripsi |
| :--- | :--- |
| *Pemilik Usaha* | *Pengguna ini bertindak sebagai pihak utama yang menginput informasi terkait takaran bahan dan penetapan harga jual. Pengguna ini juga bertindak sebagai pengobservasi perubahan data historis serta penamaan dari produk-produk yang diinput. Karakteristik dari pengguna ini adalah mengutamakan data yang update dan valid, serta sistem yang sederhana.* |
| ... | ... |

---

# BAB 2: Deskripsi Kebutuhan Perangkat Lunak

## 2.1 Kebutuhan Pengguna Awal
Sebagai [Aktor], saya ingin [Aktivitas/Kebutuhan], sehingga [Tujuan/Nilai]
| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Pemilik Usaha* |  *Merigstrasi sebuah akun baru* | *Input dan data yang dimasukkan tersimpan* |
| US-02 | *Pemilik Usaha* | *Masuk (login) ke akun yang telah dibuat* | *Dapat mengakses kembali data yang bersangkutan dengan akunnya* |
| US-03 | *Pemilik Usaha* | *Menginput bahan baku dan takaran dari sebuah produk* | *Sistem dapat melakukan kalkulasi dari bahan baku tersebut berdasarkan harga standar* |
| US-04 | *Pemilik Usaha* |  *Menginput harga jual dari sebuah produk* | *Sistem dapat melakukan perbandingan harga antara harga yang ditetapkan user dengan harga standar* |
| US-05 | *Pemilik Usaha* | *Membandingkan harga yang telah ditetapkan dengan harga standar* | *Dapat mengetahui perbedaan keuntungan/kerugian antara harga yang ditetapkan terhadap harga standar* |
| US-06 | *Pemilik Usaha* | *Mengetahui margin keuntungan/kerugian* | *Dapat melakukan penyesuaian baik untuk meningkatkan margin keuntungan ataupun ketika mengalami kerugian* |
| US-07 | *Pemilik Usaha* |  *Memberi nama/label pada produk* | *Mempermudah proses pengeditan takaran bahan baku maupun penetapan harga dari suatu produk* |
| US-08 | *Pemilik Usaha* |  *Melihat list produk yang telah diinput* | *Mempermudah pencarian suatu produk untuk dilakukan perubahan* |
| US-09 | *Pemilik Usaha* | *Menyimpan data historis perubahan harga produk* | *Dapat dimanfaatkan sebagai database harga suatu produk* |
| US-10 | *Pemilik Usaha* | *Melihat grafik tren perubahan harga* | *Mempermudah dalam menganalisis perubahan harga* |
| US-11 | *Pemilik Usaha* |  *Menerima notifikasi kerugian suatu produk* | *Dapat melakukan penyesuaian terhadap harga yang telah ditetapkan agar tidak mengalami kerugian* |


## 2.2 Deskripsi Aktivitas

| ID | Aktivitas | Penjelasan | ID User Story |
| :--- | :--- | :--- | :--- |
| A01 | *Merigstrasi akun baru* | *User membuat akun baru melalui proses autentikasi.* | *US-01* |
| A02 | *Melogin ke akun* | *User masuk ke akun yang telah teregistrasi.* | *US-02*|
| A03 | *Menginput takaran bahan baku* | *User menentukan takaran berupa jumlah dari setiap bahan baku yang diperlukan dalam pembuatan suatu produk.* | *US-03* |
| A04 | *Mengkonfirmasi inputan takaran bahan baku* | *Setelah menginput semua bahan baku yang diperlukan, user akan melakukan konfirmasi terakhir terkait input tersebut.* | *US-03* |
| A05 | *Menetapkan harga jual* | *User menetapkan harga jual yang diinginkan berdasarkan bahan baku yang digunakan.* | *US-04*|
| A06 | *Menghitung harga standar* | *Setelah menentukan semua bahan baku, sistem akan melakukan perhitungan harga produk berdasarkan harga standar bahan baku.* | *US-03* |
| A07 | *Membandingkan harga yang ditetapkan dengan harga jual* | *Setelah terdapat value dari kedua harga, akan dilakukan perbandingan* | *US-05* |
| A08 | *Menentukan margin keuntungan/kerugian* | *Sistem akan menentukan apabila perbandingan itu menghasilkan keuntungan/kerugian, beserta besar marginnya.* | *US-06*|
| A09 | *Menyesuaikan harga yang ditetapkan ke margin yang diinginkan* | *Harga yang pertama kali ditetapkan belum tentu memberi output margin yang diinginkan, sehingga memungkinkan bagi pengguna untuk melakukan perubahan pada harga.* | *US-04* |
| A10 | *Memberi label pada produk* | *Setelah harga dan bahan baku produk ditetapkan, produk perlu diberi suatu nama agar mempermudah dalam mencari dan melakukan perubahan pada produk.* | *US-07* |
| A11 | *Melihat list produk yang telah dibuat* | *Adanya label untuk tiap produk memungkinkan user untuk mencari suatu produk dengan lebih mudah* | *US-08* |
| A12 | *Memfilter list produk berdasarkan tag* | *Setiap produk dapat diberi suatu tag yang dapat dimanfaatkan untuk memfilter list.* | *US-08*|
| A13 | *Menyimpan data historis produk* | *Sistem akan terus menyimpan data historis terkait harga standar suatu produk.* | *US-09* |
| A14 | *Melihat grafik tren perubahan* | *Data historis yang disimpan sistem dapat dilihat dalam bentuk grafik untuk membantu user menganalisis perubahan harga.* | *US-10*|
| A15 | *Menerima notifikasi kerugian* | *User akan menerima notifikasi apabila salah satu produk yang dibuat mengalami kerugian akibat perubahan harga.* | *US-11* |

## 2.3 Pemetaan Kebutuhan

Perhatikan kembali semua aktivitas yang telah didefinisikan pada tabel deskripsi aktivitas atau *activity diagram*. Jabarkan kebutuhan sistem yang akan dibuat dengan mengacu pada aktivitas-aktivitas tersebut. Setiap aktivitas (ID Aktivitas) dapat memiliki satu atau lebih kebutuhan yang berbeda. Pastikan untuk mengidentifikasi dan mengisi semua jenis kebutuhan yang relevan untuk setiap aktivitas, yaitu:

- **User Requirement**, yaitu kebutuhan dari sudut pandang pengguna (apa yang dapat dilakukan pengguna).
- **Business Requirement**, yaitu aturan, kebijakan, atau standar bisnis yang harus dipenuhi oleh sistem.
- **System Requirement**, yaitu kebutuhan yang menjelaskan apa yang harus dilakukan sistem dan bagaimana sistem harus bekerja dari segi performa, keamanan, keandalan, dsb.

Lengkapi juga dengan penjelasannya dan apakah keperluan tersebut perlu didukung oleh perangkat lunak atau tidak. Jenis kebutuhan tidak terbatas hanya dari tiga jenis di atas, dapat ditambahkan yang lain juga bila diperlukan, misalnya kebutuhan regulasi (*Legal*).

| ID Kebutuhan | ID Aktivitas | Jenis Kebutuhan | Deskripsi Kebutuhan | P/L |
| :--- | :--- | :--- | :--- | :--- |
| *R01* | *A01* | *User* | *Pengguna dapat memilih metode pembayaran dan melakukan pembayaran secara digital.* | *Ya* |
| *R02* | *A01* | *Business* | *Transaksi digital sesuai dengan ketentuan UU ITE yang berlaku.* | *Tidak* |
| *R03* | *A01* | *System* | *Sistem harus mengintegrasikan API Payment Gateway dengan prinsip ACID (Atomicity, Consistency, Isolation, Durability), jika terjadi kegagalan jaringan saat saldo terpotong, sistem harus secara otomatis membatalkan transaksi atau meneruskan dana (reliable).* | *Ya* |
| *R04* | *A01* | *System* | *Kata sandi (password) atau PIN pengguna saat otorisasi pembayaran harus di-hash menggunakan algoritma SHA-256 dan tidak disimpan dalam bentuk plain-text.* | *Ya* |
| *R05* | *A02* | *Business* | *Toko harus memiliki rekening bank aktif dan valid untuk menerima pencairan dana dari sistem.* | *Tidak* |
| ... | ... | ... | ... | ... |

## 2.4 Kebutuhan Fungsional (KF)

Untuk setiap kebutuhan yang telah diidentifikasi sebagai "didukung oleh perangkat lunak", buatlah daftar kebutuhan fungsional P/L, lengkap dengan ID Kebutuhan Fungsional (KF) dan penjelasannya. Hubungkan ID Kebutuhan Fungsional dengan ID Pemetaan Kebutuhan dari sistem.

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| *KF01* | *R01* | *Perangkat lunak dapat menampilkan pilihan antarmuka metode pembayaran (transfer bank, e-wallet, kartu kredit) setelah pengguna melakukan checkout.* |
| *KF02* | *R01* | *Perangkat lunak dapat mengirimkan permintaan otorisasi transaksi ke API Payment Gateway beserta nominal tagihan dan ID Pesanan.* |
| ... | ... | ... |

## 2.5 Kebutuhan Non-Fungsional (KNF)

Uraikan dengan ringkas Kebutuhan Non-Fungsional dalam tabel sebagai berikut. Isilah kolom kebutuhan dengan kalimat yang jelas, spesifik, dan terukur (kelak dapat diuji untuk dipenuhi). Kolom ID KNF adalah nomor Kebutuhan Non-Fungsional yang harus ditelusuri pada saat pengujian. Hubungkan ID Kebutuhan Non-Fungsional dengan ID Pemetaan Kebutuhan Umum dari sistem.

| ID KNF | ID Kebutuhan | Parameter | Deskripsi Kebutuhan |
| :--- | :--- | :--- | :--- |
| *KNF01* | *R03* | *Reliability* | *Proses transaksi pembayaran harus memenuhi prinsip ACID untuk mencegah terjadinya data tersangkut (lost update) apabila terjadi kegagalan jaringan di tengah proses.* |
| *KNF02* | *R04* | *Security* | *Sistem harus mengenkripsi PIN atau password pengguna menggunakan algoritma SHA-256 sebelum data dikirimkan ke server, serta tidak menyimpannya dalam bentuk plain-text di database.* |
| ... | ... | ... | ... |

Silakan pilih yang relevan. Tidak perlu semua parameter menjadi kebutuhan non-fungsional. Berikut merupakan penjelasan dari setiap parameter. **Parameter dari Kebutuhan Non-Fungsional tidak terbatas hanya di bawah ini** karena hanya merupakan panduan sehingga dapat ditambah KNF yang lain, misalnya *constraint* dari sistem.

| Parameter | Penjelasan |
| :--- | :--- |
| *Availability* | Ketersediaan aplikasi, misalnya harus terus-menerus beroperasi 7 hari per minggu, 24 jam per hari tanpa gagal. |
| *Reliability* | Keandalan, misalnya tidak pernah boleh gagal (atau kegagalan yang ditolerir adalah …%) sehingga harus dipikirkan *fault tolerant architecture*. Biasanya hanya perlu untuk *critical application* yang jika gagal akan berakibat fatal. |
| *Ergonomy* | Kenyamanan pakai bagi pengguna. |
| *Portability* | Kemudahan untuk dibawa dan dioperasikan ke mesin/sistem operasi/*platform* yang lain. |
| *Memory* | Jika perhitungan kapasitas memori internal kritis (misalnya untuk P/L yang harus dijadikan *chips* dan ukurannya harus kecil). |
| *Response time* | Batasan waktu yang harus dipenuhi. Sangat penting untuk aplikasi *real time*. Contoh: "Aplikasi harus mampu menampilkan hasil dalam 4 detik", atau "ATM harus menarik kembali kartu yang tidak diambil dalam waktu 3 menit". |
| *Safety* | Yang menyangkut keselamatan manusia, misalnya untuk P/L yang dipakai pada sistem kontrol di pabrik. |
| *Security* | Aspek keamanan yang harus dipenuhi. |

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/
