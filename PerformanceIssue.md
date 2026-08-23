Pagespeed mobile

Mencari tahu pengalaman pengguna Anda yang sebenarnya
Tidak Ada Data

Mendiagnosis masalah performa
50
Performa
94
Aksesibilitas
100
Praktik Terbaik
100
SEO
2/2
Penjelajahan Agentic
50
FCP
+10
LCP
+15
TBT
+0
CLS
+25
SI
+0
Performa
Nilai adalah hasil perkiraan dan dapat bervariasi. Skor performa dihitung secara langsung dari metrik ini.Lihat kalkulator.
0–49
50–89
90–100
Final Screenshot

Metrik
Luaskan tampilan
First Contentful Paint
1,2 dtk
Largest Contentful Paint
3,6 dtk
Total Blocking Time
27.230 md
Cumulative Layout Shift
0
Speed Index
14,1 dtk
Captured at 23 Agu 2026, 12.24 WITA
Moto G Power Teremulasi with Lighthouse 13.4.1
Sesi satu halaman
Pemuatan halaman awal
Throttle 4G lambat
Using HeadlessChromium 151.0.7922.71 with lr
Lihat Peta Hierarki
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Tampilkan audit yang relevan dengan:

All

FCP

LCP

TBT
Insight
Permintaan pemblokiran render Perkiraan penghematan 390 md
Permintaan memblokir render awal halaman, yang dapat menunda LCP. Penundaan atau penyisipan dapat memindahkan permintaan jaringan ini dari jalur penting.LCPFCPTidak dinilai
URL
Ukuran Transfer
Durasi
makbuln.web.id Pihak pertama
16,5 KiB 390 md
…chunks/0~b3gpjrgjayb.css(www.makbuln.web.id)
16,5 KiB
390 md
Ubah posisi/geometri yang dipaksa
Perubahan posisi/geometri paksa terjadi saat JavaScript meminta properti geometris (seperti offsetWidth) setelah gaya dibatalkan karena perubahan pada status DOM. Hal ini dapat menyebabkan performa yang buruk. Pelajari lebih lanjut perubahan posisi/geometri paksa dan kemungkinan mitigasinya.Tidak dinilai
Panggilan fungsi teratas
Total waktu perubahan posisi/geometri
…chunks/0m90yso2j-2a~.js:2:10750(www.makbuln.web.id)
49 md
Sumber
Total waktu perubahan posisi/geometri
…chunks/0cvm.bm8xoi41.js:1:9793(www.makbuln.web.id)
49 md
Hierarki dependensi jaringan
Hindari perantaian permintaan penting dengan mengurangi panjang rantai, mengurangi ukuran download resource, atau menunda download resource yang tidak penting untuk mempercepat pemuatan halaman.LCPTidak dinilai
Latensi jalur kritis maksimal: 549 md
Navigasi Awal
https://www.makbuln.web.id - 144 md, 6,20 KiB
…chunks/0~b3gpjrgjayb.css(www.makbuln.web.id) - 549 md, 16,54 KiB
Origin yang dihubungkan sebelumnya
Petunjuk prakoneksi membantu browser membuat koneksi lebih awal saat halaman dimuat, sehingga dapat menghemat waktu ketika permintaan ke origin tersebut dibuat pertama kali. Berikut ini adalah origin yang telah terhubung ke halaman sebelumnya.
Origin
Sumber
https://api.iconify.design/
head > link

<link rel="preconnect" href="https://api.iconify.design">
https://my-next-app-2b56d.firebaseapp.com/
head > link
<link rel="preconnect" href="https://my-next-app-2b56d.firebaseapp.com">
Prakoneksi yang tidak digunakan. Hanya gunakan preconnect untuk origin yang kemungkinan akan diminta halaman.
Kandidat prakoneksi
Tambahkan petunjuk prakoneksi ke origin yang paling penting, tetapi usahakan untuk menggunakan tidak lebih dari 4 petunjuk.
Tidak ada origin tambahan yang cocok untuk prakoneksi
JavaScript Versi Lama Perkiraan penghematan 14 KiB
Polyfill dan transformasi memungkinkan browser lama menggunakan fitur JavaScript yang baru. Namun, banyak di antara fitur tersebut yang tidak diperlukan browser modern. Pertimbangkan untuk mengubah proses build JavaScript Anda agar tidak mentranspilasi fitur Baseline, kecuali jika Anda tahu bahwa Anda harus mendukung browser lama. Pelajari alasan sebagian besar situs dapat men-deploy kode ES6+ tanpa mentranspilasiLCPFCPTidak dinilai
URL
Byte yang tidak digunakan
makbuln.web.id Pihak pertama
14,4 KiB
…chunks/0-ydl0wbrnk6~.js(www.makbuln.web.id)
14,4 KiB
…chunks/0-ydl0wbrnk6~.js:1:6430(www.makbuln.web.id)
Array.prototype.at
…chunks/0-ydl0wbrnk6~.js:1:5818(www.makbuln.web.id)
Array.prototype.flat
…chunks/0-ydl0wbrnk6~.js:1:5931(www.makbuln.web.id)
Array.prototype.flatMap
…chunks/0-ydl0wbrnk6~.js:1:6307(www.makbuln.web.id)
Object.fromEntries
…chunks/0-ydl0wbrnk6~.js:1:6565(www.makbuln.web.id)
Object.hasOwn
…chunks/0-ydl0wbrnk6~.js:1:5560(www.makbuln.web.id)
String.prototype.trimEnd
…chunks/0-ydl0wbrnk6~.js:1:5475(www.makbuln.web.id)
String.prototype.trimStart
Perincian LCP
Pihak ketiga
Insight ini juga tersedia di Panel Performa Chrome DevTools - rekam aktivitas untuk melihat informasi yang lebih mendetail.
Diagnostik
Minimalkan pekerjaan thread utama 40,8 dtk
Sebaiknya kurangi waktu yang dihabiskan untuk mengurai, mengompilasi, dan mengeksekusi JS. Coba kirim payload JS yang lebih kecil untuk membantu mengurangi waktu. Pelajari cara meminimalkan pekerjaan thread utamaTBTTidak dinilai
Kategori
Waktu yang Dihabiskan
Other
39.309 md
Script Evaluation
798 md
Rendering
303 md
Style & Layout
234 md
Script Parsing & Compilation
104 md
Parse HTML & CSS
60 md
Garbage Collection
15 md
Kurangi JavaScript yang tidak digunakan Perkiraan penghematan 71 KiB
Kurangi JavaScript yang tidak digunakan dan tunda pemuatan skrip sampai diperlukan untuk menurunkan byte yang digunakan oleh aktivitas jaringan. Pelajari cara mengurangi JavaScript yang tidak digunakan.LCPFCPTidak dinilai
URL
Ukuran Transfer
Perkiraan Penghematan
makbuln.web.id Pihak pertama
145,8 KiB	71,1 KiB
…chunks/0m90yso2j-2a~.js(www.makbuln.web.id)
44,9 KiB
29,7 KiB
…chunks/0ok5w-a48zo1g.js(www.makbuln.web.id)
63,7 KiB
20,8 KiB
…chunks/0ef2ocagn0rwo.js(www.makbuln.web.id)
37,1 KiB
20,6 KiB
Hindari tugas thread utama yang berjalan lama 20 tugas berjalan lama

pagespeed
dekstop

Mendiagnosis masalah performa
59
Performa
94
Aksesibilitas
100
Praktik Terbaik
100
SEO
2/2
Penjelajahan Agentic
59
FCP
+10
LCP
+24
TBT
+0
CLS
+25
SI
+0
Performa
Nilai adalah hasil perkiraan dan dapat bervariasi. Skor performa dihitung secara langsung dari metrik ini.Lihat kalkulator.
0–49
50–89
90–100
Final Screenshot

Metrik
Luaskan tampilan
First Contentful Paint
0,2 dtk
Largest Contentful Paint
0,9 dtk
Total Blocking Time
20.650 md
Cumulative Layout Shift
0
Speed Index
6,0 dtk
Captured at 23 Agu 2026, 12.26 WITA
Desktop Emulasi with Lighthouse 13.4.1
Sesi satu halaman
Pemuatan halaman awal
Throttle kustom
Using HeadlessChromium 151.0.7922.71 with lr
Lihat Peta Hierarki
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Screenshot
Tampilkan audit yang relevan dengan:

All

FCP

LCP

TBT

CLS
Insight
Permintaan pemblokiran render Perkiraan penghematan 60 md
Permintaan memblokir render awal halaman, yang dapat menunda LCP. Penundaan atau penyisipan dapat memindahkan permintaan jaringan ini dari jalur penting.LCPFCPTidak dinilai
URL
Ukuran Transfer
Durasi
makbuln.web.id Pihak pertama
16,5 KiB 80 md
…chunks/0~b3gpjrgjayb.css(www.makbuln.web.id)
16,5 KiB
80 md
Ubah posisi/geometri yang dipaksa
Perubahan posisi/geometri paksa terjadi saat JavaScript meminta properti geometris (seperti offsetWidth) setelah gaya dibatalkan karena perubahan pada status DOM. Hal ini dapat menyebabkan performa yang buruk. Pelajari lebih lanjut perubahan posisi/geometri paksa dan kemungkinan mitigasinya.Tidak dinilai
Panggilan fungsi teratas
Total waktu perubahan posisi/geometri
…chunks/0m90yso2j-2a~.js:2:10750(www.makbuln.web.id)
35 md
Sumber
Total waktu perubahan posisi/geometri
[tanpa atribut]
38 md
…chunks/018e1dltxs4dl.js:113:1447(www.makbuln.web.id)
8 md
…chunks/17x1kvkw152eb.js:9:18380(www.makbuln.web.id)
0 md
…chunks/0cvm.bm8xoi41.js:1:9793(www.makbuln.web.id)
35 md
Hierarki dependensi jaringan
Hindari perantaian permintaan penting dengan mengurangi panjang rantai, mengurangi ukuran download resource, atau menunda download resource yang tidak penting untuk mempercepat pemuatan halaman.LCPTidak dinilai
Latensi jalur kritis maksimal: 80 md
Navigasi Awal
https://www.makbuln.web.id - 48 md, 6,20 KiB
…chunks/0~b3gpjrgjayb.css(www.makbuln.web.id) - 80 md, 16,54 KiB
Origin yang dihubungkan sebelumnya
Petunjuk prakoneksi membantu browser membuat koneksi lebih awal saat halaman dimuat, sehingga dapat menghemat waktu ketika permintaan ke origin tersebut dibuat pertama kali. Berikut ini adalah origin yang telah terhubung ke halaman sebelumnya.
Origin
Sumber
https://api.iconify.design/
head > link

<link rel="preconnect" href="https://api.iconify.design">
https://my-next-app-2b56d.firebaseapp.com/
head > link
<link rel="preconnect" href="https://my-next-app-2b56d.firebaseapp.com">
Prakoneksi yang tidak digunakan. Hanya gunakan preconnect untuk origin yang kemungkinan akan diminta halaman.
Kandidat prakoneksi
Tambahkan petunjuk prakoneksi ke origin yang paling penting, tetapi usahakan untuk menggunakan tidak lebih dari 4 petunjuk.
Tidak ada origin tambahan yang cocok untuk prakoneksi
Meningkatkan penayangan gambar Perkiraan penghematan 332 KiB
Mengurangi waktu download gambar dapat meningkatkan waktu pemuatan halaman dan LCP. Pelajari lebih lanjut cara mengoptimalkan ukuran gambarLCPFCPTidak dinilai
URL
Ukuran Resource
Perkiraan Penghematan
co.com
338,2 KiB	331,8 KiB
Thumbnail untuk GDG On Campus UIN Alauddin Makassar | Website Resmi
<img alt="Thumbnail untuk GDG On Campus UIN Alauddin Makassar | Website Resmi" loading="lazy" decoding="async" data-nimg="fill" class="object-cover grayscale group-hover:grayscale-0 transition-all duration-700…" src="https://i.ibb.co.com/dw7s7fPF/Instagram-post-159-1.webp" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
/dw7s7fPF/Instagram-post-159-1.webp(i.ibb.co.com)
220,6 KiB
219,5 KiB
File gambar ini lebih besar dari yang diperlukan (4443x2811) untuk dimensi yang ditampilkan (292x213). Gunakan gambar responsif untuk mengurangi ukuran download gambar.
219,5 KiB
Thumbnail untuk Sistem Pencarian | Skripsi Teknik Informatika UIN
<img alt="Thumbnail untuk Sistem Pencarian | Skripsi Teknik Informatika UIN" loading="lazy" decoding="async" data-nimg="fill" class="object-cover grayscale group-hover:grayscale-0 transition-all duration-700…" src="https://i.ibb.co.com/RVCw9jX/Chat-GPT-Image-13-Jul-2026-13-16-51-1.webp" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
/RVCw9jX/Chat-GPT-….webp(i.ibb.co.com)
70,7 KiB
67,5 KiB
File gambar ini lebih besar dari yang diperlukan (1470x929) untuk dimensi yang ditampilkan (292x213). Gunakan gambar responsif untuk mengurangi ukuran download gambar.
67,5 KiB
Thumbnail untuk PRISAY-PDP | Project Information System
<img alt="Thumbnail untuk PRISAY-PDP | Project Information System" loading="lazy" decoding="async" data-nimg="fill" class="object-cover grayscale group-hover:grayscale-0 transition-all duration-700…" src="https://i.ibb.co.com/Gv56DGY8/Chat-GPT-Image-14-Jul-2026-22-26-10-1.webp" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
/Gv56DGY8/Chat-GPT-….webp(i.ibb.co.com)
46,9 KiB
44,8 KiB
File gambar ini lebih besar dari yang diperlukan (1469x930) untuk dimensi yang ditampilkan (292x213). Gunakan gambar responsif untuk mengurangi ukuran download gambar.
44,8 KiB
JavaScript Versi Lama Perkiraan penghematan 14 KiB
Polyfill dan transformasi memungkinkan browser lama menggunakan fitur JavaScript yang baru. Namun, banyak di antara fitur tersebut yang tidak diperlukan browser modern. Pertimbangkan untuk mengubah proses build JavaScript Anda agar tidak mentranspilasi fitur Baseline, kecuali jika Anda tahu bahwa Anda harus mendukung browser lama. Pelajari alasan sebagian besar situs dapat men-deploy kode ES6+ tanpa mentranspilasiLCPFCPTidak dinilai
URL
Byte yang tidak digunakan
makbuln.web.id Pihak pertama
14,4 KiB
…chunks/0-ydl0wbrnk6~.js(www.makbuln.web.id)
14,4 KiB
…chunks/0-ydl0wbrnk6~.js:1:6430(www.makbuln.web.id)
Array.prototype.at
…chunks/0-ydl0wbrnk6~.js:1:5818(www.makbuln.web.id)
Array.prototype.flat
…chunks/0-ydl0wbrnk6~.js:1:5931(www.makbuln.web.id)
Array.prototype.flatMap
…chunks/0-ydl0wbrnk6~.js:1:6307(www.makbuln.web.id)
Object.fromEntries
…chunks/0-ydl0wbrnk6~.js:1:6565(www.makbuln.web.id)
Object.hasOwn
…chunks/0-ydl0wbrnk6~.js:1:5560(www.makbuln.web.id)
String.prototype.trimEnd
…chunks/0-ydl0wbrnk6~.js:1:5475(www.makbuln.web.id)
String.prototype.trimStart
Penyebab perubahan tata letak
Perincian LCP
Pihak ketiga
Insight ini juga tersedia di Panel Performa Chrome DevTools - rekam aktivitas untuk melihat informasi yang lebih mendetail.
Diagnostik
Minimalkan pekerjaan thread utama 35,0 dtk
Sebaiknya kurangi waktu yang dihabiskan untuk mengurai, mengompilasi, dan mengeksekusi JS. Coba kirim payload JS yang lebih kecil untuk membantu mengurangi waktu. Pelajari cara meminimalkan pekerjaan thread utamaTBTTidak dinilai
Kategori
Waktu yang Dihabiskan
Other
33.740 md
Script Evaluation
666 md
Rendering
277 md
Style & Layout
198 md
Parse HTML & CSS
84 md
Script Parsing & Compilation
83 md
Kurangi JavaScript yang tidak digunakan Perkiraan penghematan 71 KiB
Kurangi JavaScript yang tidak digunakan dan tunda pemuatan skrip sampai diperlukan untuk menurunkan byte yang digunakan oleh aktivitas jaringan. Pelajari cara mengurangi JavaScript yang tidak digunakan.LCPFCPTidak dinilai
URL
Ukuran Transfer
Perkiraan Penghematan
makbuln.web.id Pihak pertama
145,8 KiB	71,1 KiB
…chunks/0m90yso2j-2a~.js(www.makbuln.web.id)
45,0 KiB
29,7 KiB
…chunks/0ok5w-a48zo1g.js(www.makbuln.web.id)
63,7 KiB
20,7 KiB
…chunks/0ef2ocagn0rwo.js(www.makbuln.web.id)
37,1 KiB
20,6 KiB
Hindari tugas thread utama yang berjalan lama 20 tugas berjalan lama
