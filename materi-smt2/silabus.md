# Silabus Kelas Coding: Membuat Bot Telegram dengan Python (24 Sesi @ 90 Menit)

**Target Siswa:** SMP & SMA (Pemula & Lanjutan)  
**Durasi:** 24 Pertemuan @ 90 Menit (Kelas Online / Hybrid)  
**Metode Pembelajaran:** *Scaffolding Model* (I Do $\rightarrow$ We Do $\rightarrow$ You Do $\rightarrow$ Wrap-up)  
**Tools & Ekosistem:** GitHub Codespaces, Python 3, Library `pyTelegramBotAPI` (`telebot`), Telegram App

---

## ⏱️ Struktur Waktu Pembelajaran Tiap Sesi (90 Menit):
* **00–15' (15 min) — Concept Hook & Demo (I Do):** Guru mendemokan hasil akhir & menjelaskan konsep logika/arsitektur program.
* **15–50' (35 min) — Guided Live Coding (We Do):** Siswa ngoding bersama guru langkah demi langkah.
* **50–80' (30 min) — Mission & Challenge (You Do):** Siswa memodifikasi kode & menyelesaikan tantangan mandiri.
* **80–90' (10 min) — Sync Git, Bug Check & Wrap-Up:** Commit kode ke GitHub repo dan refleksi belajar.

---

## 🟢 FASE 1: Fondasi "Cloud", "Save Game", dan Python (Sesi 1–6)
*Fokus: Memahami bahwa siswa ngoding di "Server", membiasakan sinkronisasi GitHub lewat UI, dan dasar logika Python.*

### Sesi 1: Perkenalan GitHub & Markas Codespaces
* **I Do (15'):** Konsep Server/Cloud vs Komputer Lokal. Demo membuka GitHub Codespaces di browser.
* **We Do (35'):** Membuat repository baru, klik "Create codespace on main", membuat file `main.py`, jalankan `print("Halo Dunia Server!")`.
* **You Do (30'):** Membuat program ASCII Art kreatif (gambar kucing/logo) menggunakan beberapa baris `print()`.
* **Wrap-up (10'):** Ritual commit pertama ke GitHub.

### Sesi 2: Ritual "Sync" (Save Game) & Kotak Data (Variabel)
* **I Do (15'):** Konsep Version Control seperti "Save Game" checkpoint. Penjelasan memori komputer dan Variabel.
* **We Do (35'):** Menggunakan tab Source Control di Codespaces (isi pesan commit $\rightarrow$ klik Commit & Sync). Menyimpan nama dan umur ke variabel lalu menampilkan isinya.
* **You Do (30'):** Membuat cerita mini Mad Libs dengan menggabungkan 4 variabel (Nama, Tempat, Makanan, Hewan).
* **Wrap-up (10'):** Commit & Sync perubahan.

### Sesi 3: Kalkulator Server (Tipe Data & Matematika)
* **I Do (15'):** Mengenal Integer, Float, String, dan operasi matematika dasar (`+`, `-`, `*`, `/`).
* **We Do (35'):** Membuat script penghitung umur otomatis (`tahun_sekarang - tahun_lahir`) dan konversi suhu sederhana.
* **You Do (30'):** Membuat program penghitung diskon belanja (`harga_asli - (harga_asli * diskon / 100)`).
* **Wrap-up (10'):** Sync ke repository.

### Sesi 4: Ngobrol Sama Komputer (User Input & f-String)
* **I Do (15'):** Menangkap respon dinamis dari user dengan `input()` dan merapikan teks dengan f-string.
* **We Do (35'):** Program interaktif yang menanyakan nama, cita-cita, dan hobi, lalu merespon dengan kalimat yang rapi.
* **You Do (30'):** Membuat program wawancara mini dengan 5 pertanyaan berurutan dan kesimpulan otomatis.
* **Wrap-up (10'):** Sync ke repository.

### Sesi 5: Logika Bercabang (If-Elif-Else Dasar)
* **I Do (15'):** Boolean (`True`/`False`), operator perbandingan (`>`, `<`, `==`, `!=`), dan struktur percabangan.
* **We Do (35'):** Program penentu kualifikasi SIM / Bioskop berdasarkan umur pengguna.
* **You Do (30'):** Membuat program tebak angka 1–5 dengan respon: *"Terlalu besar"*, *"Terlalu kecil"*, atau *"Tepat!"*.
* **Wrap-up (10'):** Sync ke repository.

### Sesi 6: Review & Mini Project Python CLI
* **I Do (15'):** Strategi menggabungkan Variabel, Input, dan Logika If-Else ke dalam satu skenario game.
* **We Do (35'):** Membangun kerangka game *"Pilih Jalan Cerita"* (Text Adventure) dengan 2 cabang jalan.
* **You Do (30'):** Menambahkan cabang jalan ke-3, rintangan rahasia, dan ending cerita yang berbeda.
* **Wrap-up (10'):** Evaluasi Fase 1 & pastikan seluruh file tersimpan rapi di GitHub.

---

## 🟡 FASE 2: Membangkitkan Bot & Bot Kalkulator (Sesi 7–9)
*Fokus: Koneksi API Telegram, instalasi library, konsep runtime polling, dan bot pengolah matematika.*

### Sesi 7: Lahirnya Sang Bot (BotFather & Token)
* **I Do (15'):** Cara kerja Bot Telegram, konsep API Token rahasia dari BotFather, dan library `pyTelegramBotAPI`.
* **We Do (35'):** Setup `requirements.txt`, jalankan `pip install -r requirements.txt`, buat file `bot.py`, tangani command `/start` dan `/help`.
* **You Do (30'):** Buat command `/about` yang menampilkan profil siswa, foto/avatar, dan deskripsi bot dengan format teks tebal/miring.
* **Wrap-up (10'):** Mengamankan token dan sync repo.

### Sesi 8: Konsep Runtime, Bot Beo & Filter Teks Semangat
* **I Do (15'):** Konsep Runtime Loop (`bot.infinity_polling()`) dan menangkap pesan teks biasa (`@bot.message_handler(func=...)`).
* **We Do (35'):** Membuat bot membalas sapaan ("halo", "pagi") dan jika user kirim "mager", bot otomatis membalas dengan kata-kata motivasi belajar.
* **You Do (30'):** Buat fitur anti-toxic (memperingatkan user jika mengetik kata kasar tertentu) + 3 respon percakapan unik.
* **Wrap-up (10'):** Sync repo.

### Sesi 9: 🧮 BOT 0 — Bot Kalkulator Pintar di Telegram
* **I Do (15'):** Memproses input angka dari chat Telegram, membedah string command dengan `.split()`, dan konversi tipe data.
* **We Do (35'):**
  * Command `/tambah 10 20` $\rightarrow$ Bot balas `Hasil: 30`
  * Command `/kali 5 4` $\rightarrow$ Bot balas `Hasil: 20`
* **You Do (30'):** Buat command `/diskon [harga] [persen]` (hitung harga akhir) dan tangani error pembagian 0 pada command `/bagi`.
* **Wrap-up (10'):** Sync repo.

---

## 🟠 FASE 3: Bot 1 — Timer Belajar & Study Buddy Pomodoro (Sesi 10–11)
*Fokus: Modul waktu, background timer non-blocking, validasi error handling, dan streak belajar.*

### Sesi 10: ⏱️ BOT 1 — Timer Pomodoro Fokus Belajar
* **I Do (15'):** Mengenal modul `time` dan `threading.Timer` (kenapa bot tidak boleh di-`time.sleep` di thread utama).
* **We Do (35'):** Membuat command `/fokus [menit]`. Bot mengirim pesan: *"Mode fokus dimulai! HP ditaruh ya!"*, lalu setelah menit habis bot mengirim notifikasi: *"⏰ Waktu belajar selesai! Istirahat 5 menit dulu!"*.
* **You Do (30'):** Buat preset instan `/pomodoro` (otomatis set 25 menit) dan `/istirahat` (set 5 menit).
* **Wrap-up (10'):** Uji coba notifikasi alarm bot bersama & sync repo.

### Sesi 11: ⏱️ Validasi Anti-Crash & Sesi Belajar (Streak Counter)
* **I Do (15'):** Antisipasi error input (misal user ketik `/fokus abc`) dengan struktur `try-except`.
* **We Do (35'):** Menambahkan `try-except` pada konversi waktu dan variabel penghitung jumlah sesi fokus yang berhasil diselesaikan hari ini.
* **You Do (30'):** Buat command `/streak` untuk menampilkan jumlah sesi belajar yang telah diselesaikan hari ini beserta badge pencapaian (misal: 🥇 *Master Fokus*).
* **Wrap-up (10'):** Sync repo.

---

## 🔵 FASE 4: Bot 2 — To-Do List PR & Jadwal Sekolah (Sesi 12–14)
*Fokus: Struktur data List, perulangan For Loop, dan operasi CRUD (Create, Read, Update, Delete) tugas sekolah.*

### Sesi 12: Fondasi List Tugas untuk Bot Telegram
* **I Do (15'):** Konsep List di Python (`append`, `len`, `indexing`) untuk menampung data dinamis.
* **We Do (35'):** Membuat List penampung tugas, command `/tambah_pr [nama_tugas]`, dan konfirmasi bot bahwa PR telah tercatat.
* **You Do (30'):** Berikan batasan maksimal 5 tugas aktif dan tampilkan jumlah tugas yang tersimpan saat ini.
* **Wrap-up (10'):** Sync repo.

### Sesi 13: 📋 Tampilan Checklist & For Loop
* **I Do (15'):** Memformat pesan Telegram menggunakan For Loop dan emoji checklist.
* **We Do (35'):** Command `/cek_pr` $\rightarrow$ Bot me-loop List tugas dan menampilkan:
  ```text
  📋 DAFTAR PR KAMU:
  1. PR Matematika hal 50
  2. Gambar Seni Budaya
  ```
* **You Do (30'):** Jika list PR kosong, buat bot membalas: *"🎉 Hore! Tidak ada PR sama sekali!"*.
* **Wrap-up (10'):** Sync repo.

### Sesi 14: ✂️ Coret & Hapus PR Selesai (CRUD Operations)
* **I Do (15'):** Menghapus atau menandai item selesai menggunakan `.pop()` dan penyesuaian indeks Python (0-based) vs manusia (1-based).
* **We Do (35'):** Command `/selesai [nomor]` $\rightarrow$ Menghapus PR nomor tersebut dari daftar dan memberi ucapan selamat.
* **You Do (30'):** Tangani error jika user memasukkan nomor PR yang tidak ada di daftar (misal cuma ada 2 PR, tapi ketik `/selesai 5`).
* **Wrap-up (10'):** Sync repo.

---

## 🟣 FASE 5: Bot 3 — Money Tracker, JSON Storage & Custom UI (Sesi 15–20)
*Fokus: Dictionary (State multi-user), alur percakapan interaktif bertahap, penyimpanan data lokal permanen, dan keyboard menu.*

### Sesi 15: Dictionary & State Saldo per User ID
* **I Do (15'):** Konsep Key-Value di Dictionary agar saldo uang jajan tiap anak tidak tertukar di server (`user_data = { user_id: saldo }`).
* **We Do (35'):** Command `/setsaldo [nominal]` dan `/saldo` untuk melihat sisa uang jajan saat ini.
* **You Do (30'):** Buat command `/tambah_saldo [nominal]` untuk mencatat tambahan uang saku dari orang tua.
* **Wrap-up (10'):** Sync repo.

### Sesi 16: 💸 Catat Pengeluaran & Sisa Uang Jajan
* **I Do (15'):** Logika pemotongan saldo, validasi saldo minus, dan riwayat transaksi.
* **We Do (35'):** Command `/jajan [nominal] [keterangan]` $\rightarrow$ Saldo berkurang otomatis dan bot mengirimkan konfirmasi sisa saldo.
* **You Do (30'):** Jika nominal jajan > saldo yang tersedia, bot menolak transaksi: *"⚠️ Uang jajanmu tidak cukup!"*.
* **Wrap-up (10'):** Sync repo.

### Sesi 17: 💬 Percakapan Berantai Interaktif (`next_step_handler`)
* **I Do (15'):** Memahami State Machine percakapan: Bot tanya $\rightarrow$ User jawab $\rightarrow$ Bot proses hasil.
* **We Do (35'):** Membangun alur interaktif `/catat`:
  1. Bot: *"Beli apa?"* $\rightarrow$ User: *"Es Boba"*
  2. Bot: *"Berapa harganya?"* $\rightarrow$ User: *"15000"*
  3. Bot: Merangkum belanjaan dan memotong saldo.
* **You Do (30'):** Buat alur interaktif serupa untuk `/set_target` (menentukan barang impian yang ingin dibeli).
* **Wrap-up (10'):** Sync repo.

### Sesi 18: 🎯 Progress Bar Tabungan Impian
* **I Do (15'):** Menghitung persentase tabungan `(saldo / harga_target) * 100` dan merender progress bar teks (`████░░░░ 50%`).
* **We Do (35'):** Command `/target` $\rightarrow$ menampilkan nama barang, harga, sisa kekurangan, dan visual progress bar.
* **You Do (30'):** Jika tabungan sudah mencapai 100%, bot menampilkan ucapan selebrasi *"🎉 Selamat! Target tercapai, siap dibeli!"*.
* **Wrap-up (10'):** Sync repo.

### Sesi 19: 💾 Simpan Data Permanen (JSON File Storage)
* **I Do (15'):** Mengapa data di memory RAM hilang saat server restart? Konsep membaca dan menulis file (`import json`, `json.dump`, `json.load`).
* **We Do (35'):** Menyimpan data PR dan keuangan ke dalam file `database.json` lokal secara otomatis setiap ada perubahan.
* **You Do (30'):** Uji coba mematikan bot lalu menjalankannya kembali, pastikan saldo & PR tidak hilang.
* **Wrap-up (10'):** Sync repo.

### Sesi 20: 🎛️ UI Upgrade: Custom Button Keyboard (`ReplyKeyboardMarkup`)
* **I Do (15'):** Pengenalan antarmuka tombol menu Telegram menggunakan `types.ReplyKeyboardMarkup` dan `types.KeyboardButton`.
* **We Do (35'):** Menggabungkan modul ke dalam tombol menu utama:
  * Baris 1: `[ 📝 Cek PR ]` `[ ➕ Tambah PR ]`
  * Baris 2: `[ 💰 Cek Saldo ]` `[ 💸 Catat Jajan ]`
  * Baris 3: `[ ⏱️ Timer Belajar ]` `[ 🧮 Kalkulator ]`
* **You Do (30'):** Hubungkan semua respon tombol agar langsung menjalankan fitur tanpa perlu mengetik command `/`.
* **Wrap-up (10'):** Sync repo & persiapan menuju Capstone Project.

---

## 🏆 FASE 6: Capstone / Final Project & Demo Day (Sesi 21–24)
*Fokus: Pengerjaan proyek mandiri berkonsep, bimbingan one-on-one, polishing, dan presentasi karya.*

### Sesi 21: Final Project Day 1 — Ideasi & Desain Arsitektur Bot
* **Aktivitas:**
  * Siswa memilih spesialisasi bot impian: **Super Bot Asisten Pelajar**, **Bot Pengelola Kas Kelas**, atau **Bot Gamifikasi Belajar**.
  * Merancang flowchart fitur & struktur data yang akan digunakan.
  * Inisialisasi repository baru untuk Final Project di GitHub.

### Sesi 22: Final Project Day 2 — Core Development
* **Aktivitas:**
  * Siswa melakukan *Live Coding* mandiri mengimplementasikan fitur inti bot mereka.
  * Guru berkeliling memberikan *bimbingan one-on-one* dan membantu memecahkan hambatan logika/bug.

### Sesi 23: Final Project Day 3 — Polishing, UI, & Bug Hunting
* **Aktivitas:**
  * Mempercantik antarmuka teks (emoji, teks tebal/miring, menu tombol interaktif).
  * Sesi *Bug Hunting* bersama teman sebangku (saling menguji coba bot untuk mencari potensi crash).
  * Menulis file `README.md` panduan penggunaan bot di GitHub.

### Sesi 24: Final Project Day 4 — Demo Day & Graduation! 🎉
* **Aktivitas:**
  * Setiap siswa membagikan username bot Telegram masing-masing ke grup kelas.
  * Presentasi karya 3–5 menit: demo fitur unggulan, arsitektur data, dan tantangan yang berhasil dipecahkan.
  * Review perjalanan siswa dari Sesi 1 (print halo dunia) hingga berhasil menciptakan Bot Asisten di Sesi 24!
