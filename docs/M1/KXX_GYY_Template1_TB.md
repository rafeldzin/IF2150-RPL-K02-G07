<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## *Nama Perangkat Lunak*

### Untuk: *[Nama Asisten]*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *\[Kelas\]* |
| Kelompok | *\[Nomor Kelompok\]*  |

| NIM | Nama |
|---|---|
| *[NIM 1]* | *[Nama Anggota 1]* |
| *[NIM 2]* | *[Nama Anggota 2]* |
| *[NIM 3]* | *[Nama Anggota 3]* |
| *[NIM 4]* | *[Nama Anggota 4]* |
| *[NIM 5]* | *[Nama Anggota 5]* |
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
Abstraksikan solusi perangkat lunak yang diusulkan dari sudut pandang pengguna. Jelaskan target platform yang akan digunakan (misalnya: desktop application) beserta alasan pemilihannya. Deskripsikan juga nilai unik (inovasi inti) dari perangkat lunak kalian dan apa yang membedakannya dari solusi yang sudah ada.

## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor
Buatlah daftar seluruh aktor (pengguna) yang akan berinteraksi langsung dengan sistem solusi yang kalian kembangkan. Berikan penjelasan singkat mengenai peran dan karakteristik dari masing-masing aktor tersebut.

| Aktor | Deskripsi |
| :--- | :--- |
| *Kasir* | *Pengguna ini bertindak sebagai pihak yang bertanggung jawab untuk memproses transaksi harian dan melayani pembayaran pelanggan. Karakteristik dari pengguna ini adalah mengutamakan kecepatan dan keakuratan saat bertransaksi.* |
| ... | ... |


## 3.2 Kebutuhan Pengguna Awal
Definisikan apa yang ingin dicapai oleh pengguna saat menggunakan sistem ini dalam format *User Story* (Sebagai [Aktor], saya ingin [Aktivitas/Kebutuhan], sehingga [Tujuan/Nilai]). Pastikan kalian berfokus pada "apa yang ingin dilakukan pengguna".

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Kasir* |  *Memindai barcode barang* | *Proses pembayaran berjalan cepat dan akurat* |
| US-02 | *[Nama Aktor]* | *[Kebutuhan pengguna]* | *[Tujuan yang dicapai pengguna]* |
| ... | ... | ... | ... |

## 3.3 Model Proses Bisnis
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