<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## *Nama Perangkat Lunak*

### Untuk: *Stefani Angeline Oroh*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *K2* |
| Kelompok | *07*  |

| NIM | Nama |
|---|---|
| *13525002* | *Ahmad Boutros Fathir* |
| *13525020* | *Klio Lysander* |
| *13525047* | *Muhammad Fakhriyan Rizki M.* |
| *13525053* | *Kevin Sie* |
| *13525062* | *Rafel Dzinun Muhammad* |
---

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Usaha Mikro, Kecil, dan Menengah (UMKM) yang berada pada sektor kuliner menjadi salah satu penggerak utama dalam perekonomian di Indonesia dan dapat berkontribusi langsung terhadap SDG yang ke-8 yaitu "Decent Work and Economic Growth". Yang menjadi masalah adalah banyak pedagang UMKM kuliner menjalani usaha tanpa menghitung biaya produksi yang jelas. Padahal harga bahan baku itu fluktuatif dan bisa berubah dalam hitungan minggu, hari, ataupun kondisi pasar. Salah satu contohnya adalah data CNBC Indonesia yang menunjukkan harga bawang merah naik dari Rp 39.124/kg menjadi Rp 45.329/kg pada 2024 ke 2025. Banyak pedagang yang menetapkan harga jual sementara biaya produksi terus meningkat, yang lama-lama dapat menyebabkan kerugian produk tanpa disadari. Apalagi jika pedagang menjual banyak produk, terkadang pemilik usaha tidak mengetahui produk mana yang beneran untung dan rugi. Masalah ini perlu diselesaikan karena dapat berdampak langsung pada keberlangsungan usahanya. Oleh karena itu, diperlukan suatu alat pemantauan bagi para pelaku usaha yang terus menjalani kondisi rugi pada beberapa produk tanpa disadari.

## 1.2 Analisis Kondisi Saat Ini
Kondisi yang terjadi sekarang menunjukkan bahwa para pedagang UMKM kuliner masih menentukan harga dan memantau keuntungan atau kerugian dengan cara manual. Harga jual ditentukan di awal berdasarkan perkiraan kasar harga biaya bahan baku saat itu tanpa ada evaluasi dan perhitungan mendalam. Pencatatan harga bahan baku juga tidak terdokumentasi dengan baik, bahkan pedagang biasanya hanya mengandalkan ingatan saja sehingga menjadi susah untuk mengecek biaya produksi secara berkala. Perhitungan HPP per produk juga biasanya tidak pernah dilakukan secara terpisah karena pedagang langsung membeli bahan baku untuk semua produk sekaligus. Perhitungan untung atau rugi baru dilakukan di akhir periode dan tidak menganalisis margin per produk.

Dari permasalahan ini, terdapat alasan yang menjadi dasar pengembangan proyek perangkat lunak ini, yang dapat dirincikan menjadi:

1. Belum ada sistem yang menghubungkan perubahan harga bahan baku langsung ke perhitungan biaya produksi tiap produk
2. Belum ada mekanisme yang memperingatkan kalau suatu produk sudah mulai masuk ke fase kerugian akibat kenaikan harga

Perangkat lunak inilah yang akan dikembangkan untuk menutupi permasalahan di atas.

---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Perangkat lunak yang kami usulkan adalah aplikasi manajemen Harga Pokok Penjualan (HPP) dberbasis mobile yang dirancang untuk pelaku UMKM. Solusi ini berfokus pada pemantauan keuntungan produk secara berkelanjutan yang disesuaikan dengan perubahan harga bahan baku di pasar. Nilai unik dan inovasi inti dari aplikasi ini terletak pada otomatisasi analisis margin keuntungan. Pengguna dapat menginput daftar bahan baku beserta takaran spesifik untuk tiap porsi menu, lalu menetapkan harga jualnya. Sistem akan secara otomatis mengalkulasi margin keuntungan atau kerugian berdasarkan perbandingan dengan harga standar bahan baku. Sebagai bentuk pencegahan, aplikasi ini memiliki fitur Notifikasi Kerugian yang akan langsung memberikan peringatan apabila perubahan harga pasar menyebabkan suatu menu masuk ke fase rugi. Aplikasi juga menyediakan fitur grafik perubahan harga dari bahan baku, di mana pengguna dapat memantau tren pergerakan harga dari bahan baku yang relevan dengan usaha mereka. Selain itu, sistem dirancang untuk fleksibel dengan menyediakan opsi penyesuaian harga khusus untuk penjualan via platform makanan online (GoFood, GrabFood, atau ShopeeFood), sehingga pengguna dapat melihat proyeksi keuntungan setelah dipotong komisi aplikasi.

## 2.2 Asumsi dan Batasan
Asumsi :

1. Pemilik UMKM memiliki smartphone dan koneksi internet yang memadai untuk menggunakan aplikasi.
2. Pemilik usaha memiliki takaran baku yang pasti untuk setiap produk yang dijual, sehingga kalkulasi biaya bahan dapat dimodelkan secara akurat oleh sistem.
3. Pengguna memiliki literasi digital dasar untuk melakukan input angka dan rutin memperbarui data harga beli bahan baku yang mereka temui di pasar.

Batasan :

1. 
---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor
Buatlah daftar seluruh aktor (pengguna) yang akan berinteraksi langsung dengan sistem solusi yang kalian kembangkan. Berikan penjelasan singkat mengenai peran dan karakteristik dari masing-masing aktor tersebut.

| Aktor | Deskripsi |
| :--- | :--- |
| *Pemilik Usaha* | *Orang yang menjalankan usaha kuliner. dapat menginput kebutuhan bahan baku, memantau kerugian, dan melihat tren harga* |
| *karyawan/staff operational* | *bertugas menginput data dan update harga beli* |


## 3.2 Kebutuhan Pengguna Awal
Definisikan apa yang ingin dicapai oleh pengguna saat menggunakan sistem ini dalam format *User Story* (Sebagai [Aktor], saya ingin [Aktivitas/Kebutuhan], sehingga [Tujuan/Nilai]). Pastikan kalian berfokus pada "apa yang ingin dilakukan pengguna".

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Penjual* |  *Menentukan Takaran Bahan dan Harga Jual* | *Mengetahui apabila harga jual yang ditetapkan bersifat untung/rugi berdasarkan harga standar bahan baku* |
| US-02 | *Penjual* | *Notifikasi Kerugian* | *Memberitahu pengguna bahwa harga yang ditetapkan tidak lagi menguntungkan* |
| US-03 | *Penjual* | *Data Perubahan Harga Bahan* | *Mengetahui tren perubahan harga yang terjadi pada bahan baku*  |
| US-04 | *Penjual* | *...* | *...*  |
| US-05 | *Penjual* | *...* | *...*  |

## 3.3 Deskripsi Aktivitas
Buatlah daftar seluruh aktivitas yang terdapat dalam sistem solusi, lengkap dengan ID dan penjelasan. Telusuri hubungan aktivitas tersebut dengan *user story* yang sudah dituliskan sebelumnya. Bisa dibuat dalam bentuk tabel.
| ID | Aktivitas | Penjelasan | ID User Story |
| :--- | :--- | :--- | :--- |
| A01 | *Melakukan Pemesanan* | *Pelanggan memulai proses dengan memesan produk.* | *US-01* |
| A02 | *Memproses Pesanan* | *Sistem memproses dan menyiapkan detail sesuai dengan pesanan.* | *US-02*|
| ... | ... | ... | ... |

## 3.4 Model Proses Bisnis
Buatlah *Activity Diagram* atau *Swimlane Diagram* yang menunjukkan alur kerja proses bisnis dari sistem solusi. Diagram ini harus memvisualisasikan bagaimana alur operasional di dunia nyata berjalan lebih efisien dengan adanya interaksi antara aktor (yang didefinisikan pada poin 3.1) dan sistem perangkat lunak. Perhatikan notasi yang digunakan dalam pembuatannya.
<br>

<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/diagram-act-1.avif" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Activity Diagram</i>
</p>

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/