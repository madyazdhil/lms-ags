**# Silabus Kelas Coding: Membuat Bot Telegram dengan Python (24 Sesi)

Target Siswa: SMP & SMA (Pemula & Lanjutan) Durasi: 24 Pertemuan @ 1 Jam (Kelas Online) Tools: GitHub Codespaces, Python, Library telebot, Telegram

## FASE 1: Fondasi "Cloud", "Save Game", dan Python (Sesi 1-6)

Fokus: Memahami bahwa mereka ngoding di "Server", membiasakan sinkronisasi GitHub lewat UI, dan dasar Python.

### Sesi 1: Perkenalan GitHub & Markas Codespaces

* Materi Utama: Membuat Repository di GitHub dan meluncurkan Codespaces. Pengenalan antarmuka IDE (Explorer, Editor, Terminal). Penjelasan konsep Server/Cloud.
* Live Coding: Panduan membuat repo baru, klik "Create codespace on main". Bikin file main.py pertama, jalankan print("Halo Dunia Server!").
* Tantangan Ekstra: Print ASCII Art sederhana (misal gambar kucing atau logo) menggunakan beberapa baris print().

### Sesi 2: Ritual "Sync" (Save Game) & Kotak Data (Variabel)

* Materi Utama: Cara menyimpan kode kembali ke GitHub tanpa terminal. Menggunakan tab Source Control di Codespaces (isi pesan -> klik Commit & Sync). Pengenalan Variabel.
* Live Coding: Menyimpan nama dan umur ke dalam variabel, lalu nge-print isinya. Melakukan Sync pertama ke GitHub lewat UI.
* Tantangan Ekstra: Menggabungkan 3-4 variabel menjadi sebuah kalimat cerita (Mad Libs sederhana).

### Sesi 3: Kalkulator Server (Tipe Data & Matematika)

* Materi Utama: Integer, Float, String. Operasi matematika dasar (+, -, *, /).
* Live Coding: Membuat script penghitung umur otomatis (Tahun sekarang - Tahun lahir).
* Tantangan Ekstra: Membuat script penghitung diskon belanja.

### Sesi 4: Ngobrol Sama Komputer (User Input)

* Materi Utama: Menggunakan input() dan f-string (format teks).
* Live Coding: Program yang menanyakan nama dan hobi, lalu merespon dengan kalimat yang rapi.
* Tantangan Ekstra: Membuat program wawancara mini dengan 5 pertanyaan beruntun.

### Sesi 5: Logika Bercabang (If-Else Dasar)

* Materi Utama: Memahami Boolean (True/False) dan percabangan if, elif, else.
* Live Coding: Program penentu boleh bikin SIM atau belum berdasarkan umur.
* Tantangan Ekstra: Program tebak angka sederhana 1-5 (pakai input).

### Sesi 6: Review & Mini Project Python

* Materi Utama: Menggabungkan Variabel, Input, dan If-Else.
* Live Coding: Review kilat dan pastikan semua anak paham cara klik Sync di menu Source Control sebelum menutup tab.
* Tantangan Ekstra: Membuat game "Pilih Jalan Cerita" (Choose your own adventure) berbasis teks di terminal.

## FASE 2: Membangkitkan Bot & Memahami Runtime (Sesi 7-12)

Fokus: Koneksi Telegram, instalasi library, dan konsep Runtime.

### Sesi 7: Lahirnya Sang Bot (BotFather & Token)

* Materi Utama: Membuat bot di BotFather. Penjelasan Token (Kunci Rahasia Bot).
* Live Coding: Setup requirements.txt dan install pyTelegramBotAPI (telebot).
* Tantangan Ekstra: Mengatur foto profil dan deskripsi bot di BotFather agar terlihat profesional.

### Sesi 8: Konsep Runtime & Bot Beo

* Materi Utama: Konsep Runtime (Kode yang berjalan terus-menerus/polling untuk ngecek pesan baru). Kenapa bot mati kalau Codespace ditutup?
* Live Coding: Menulis skeleton (kerangka) bot telebot dan membuat fungsi agar bot membalas pesan apapun dengan pesan yang sama.
* Tantangan Ekstra: Bot merespon dengan menambahkan kata "Bro" di setiap akhir kalimat user.

### Sesi 9: Bot yang Patuh Perintah (Command Handlers)

* Materi Utama: Menggunakan @bot.message_handler(commands=['start', 'help']).
* Live Coding: Membuat balasan khusus saat user mengetik /start atau /help.
* Tantangan Ekstra: Membuat command /sosmed yang berisi link sosmed (fiktif/asli) mereka.

### Sesi 10: Bot yang Paham Teks (Text Handlers & If-Else)

* Materi Utama: Membaca isi chat biasa (bukan command) dan menanggapinya pakai If-Else.
* Live Coding: Jika user ketik "halo", bot balas "Hai!". Jika "pagi", bot balas "Selamat Pagi!".
* Tantangan Ekstra: Membuat bot anti-toxic (memperingatkan user jika mengetik kata-kata kasar tertentu).

### Sesi 11: Bot Ngirim Gambar (Media Handling)

* Materi Utama: Cara bot mengirim file selain teks.
* Live Coding: Membuat command /foto di mana bot membalas dengan mengirim gambar dari URL internet.
* Tantangan Ekstra: Membuat command /stiker (mencari File ID stiker Telegram dan mengirimkannya).

### Sesi 12: Mini Project Bot Asisten (Evaluasi Fase 2)

* Aktivitas: Menggabungkan materi Sesi 7-11.
* Target Semua Anak: Bot memiliki 3 command dan bisa merespon minimal 3 sapaan teks.
* Tantangan Ekstra: Merapikan kode dan memastikan tidak ada error saat Sync Changes ke repo GitHub.

## FASE 3: Struktur Data & Alur Percakapan (Sesi 13-18)

Fokus: List, Looping, dan percakapan bot yang bertahap.

### Sesi 13: Rak Buku Server (List)

* Materi Utama: Menyimpan banyak data dalam satu tempat (List Python).
* Live Coding: Membuat variabel list berisi daftar makanan favorit, lalu nge-print elemen ke-1, ke-2.
* Tantangan Ekstra: Menambah dan menghapus isi list menggunakan kode (append, remove).

### Sesi 14: Mesin Pengulang (For Loop)

* Materi Utama: Melakukan iterasi (pengulangan) pada isi List.
* Live Coding: Menampilkan isi list secara rapi ke bawah.
* Tantangan Ekstra: Menggabungkan Loop dengan If (mencari makanan tertentu di dalam list).

### Sesi 15: Daftar Menu Telegram (Integrasi List, Loop, Bot)

* Materi Utama: Mengaplikasikan List & Loop untuk dikirim ke chat Telegram.
* Live Coding: Membuat command /menu yang merespon daftar makanan dari list Python.
* Tantangan Ekstra: Mempercantik balasan bot dengan emoji list (bullet points) di setiap item.

### Sesi 16: Loker Laci Ganda (Dictionary) - Pengenalan Penting!

* Materi Utama: Konsep Key-Value di Dictionary Python. Penjelasan ini penting sebagai fondasi menyimpan skor bot nanti.
* Live Coding: Membuat dictionary data user (Nama, Umur, Skor).
* Tantangan Ekstra: Membuat dictionary berisi "Kamus Slang" (misal: "Otw" = "On The Way") dan bot bisa menerjemahkannya.

### Sesi 17: Percakapan Berantai (Next Step Handler) Part 1

* Materi Utama: Bagaimana bot tahu bahwa chat user selanjutnya adalah "jawaban" dari pertanyaan bot, bukan chat biasa?
* Live Coding: Menggunakan bot.register_next_step_handler(). Bot nanya "Siapa namamu?", user jawab, bot balas "Halo, [Nama]!".
* Tantangan Ekstra: Memastikan bot tidak crash jika bot meminta angka tapi user memasukkan huruf.

### Sesi 18: Percakapan Berantai Part 2

* Materi Utama: Menyatukan Alur Percakapan.
* Live Coding: Bot nanya "Nama?", lanjut "Umur?", lalu merangkum datanya.
* Tantangan Ekstra: Membuat kalkulator via bot (Minta angka 1, minta angka 2, tampilkan hasil tambah).

## FASE 4: Proyek Akhir - Bot Kuis Interaktif (Sesi 19-24)

Fokus: Menggabungkan State (Skor), alur, dan finalisasi.

### Sesi 19: Memori Bot (State & Skor dengan Dictionary)

* Materi Utama: Menggunakan Dictionary untuk menyimpan skor per-User ID Telegram. (Agar skor si A dan si B tidak tertukar di server).
* Live Coding: Membuat variabel global user_scores = {} dan menambah skor jika jawaban benar.
* Tantangan Ekstra: Menambahkan fitur "/cek_skor" agar user bisa melihat skor mereka sendiri kapan saja.

### Sesi 20: Merancang Pertanyaan Kuis

* Materi Utama: Menulis alur kuis.
* Live Coding: Membuat pertanyaan kuis ke-1. Jika jawaban benar, skor +10. Lanjut ke pertanyaan ke-2.
* Tantangan Ekstra: Menyimpan pertanyaan dan kunci jawaban di dalam Dictionary agar kode lebih rapi.

### Sesi 21: Validasi Jawaban Kuis

* Materi Utama: Logika if/else lanjutan untuk mengecek jawaban kuis (mengecilkan huruf dengan .lower() agar tidak case sensitive).
* Live Coding: Menyelesaikan alur kuis hingga 3 pertanyaan dan menampilkan skor akhir.
* Tantangan Ekstra: Menambahkan variasi balasan jika salah (kasih semangat) dan jika benar (kasih selamat).

### Sesi 22: Upgrade Visual (Custom Keyboard/Reply Markup)

* Materi Utama: Membuat tombol Multiple Choice (Pilihan Ganda) di bawah chat keyboard Telegram.
* Live Coding: Menggunakan ReplyKeyboardMarkup agar user tinggal klik A, B, C, atau D tanpa harus mengetik.
* Tantangan Ekstra: Membuat tombol khusus yang langsung mengirim command (seperti tombol menu utama).

### Sesi 23: Final Debugging & Cleanup

* Materi Utama: Merapikan struktur kode, menghapus print yang tidak perlu, memastikan semua error handling aman.
* Live Coding: Sesi bebas bug-fixing bersama. Memastikan semua fitur Sync/Commit ke Repo sudah aman.
* Tantangan Ekstra: Menulis ReadMe sederhana atau pesan sambutan /start yang sangat detail.

### Sesi 24: Demo Day & Perayaan!

* Materi Utama: Presentasi dan kebanggaan.
* Aktivitas: Semua anak membagikan username bot mereka di grup. Saling mencoba bot buatan teman. Guru me-review perjalanan mereka dari Sesi 1 hingga jadi developer bot.

**

kbuaaunemrrsdddasdasdasadeenar ir perb ajaru a
