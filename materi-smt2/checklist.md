# Production Readiness & AI Context Checklist

Welcome! This document serves as the master blueprint and single source of truth for AI agents (including Antigravity) to understand, build, test, and deploy your production application.

---

## 1. Product & Scope Definition (PRD & Core Vision)

### Explanation

Before writing code, AI agents need to understand the core purpose of the application, who the target users are, what problem it solves, and the MVP (Minimum Viable Product) scope vs. future features.

### Questionnaire & Details (Fill in below)

- **Project Name**: LMS AGS Semester 2 - PPT Presentation Coding Python & Telegram Bot for Kids
- **Core Value Proposition / Tagline**: Slide Presentasi HTML Interaktif, Bubbly & Fun berbasis Pyodide (Python in Browser) untuk Mengajar Coding Python & Bot Telegram bagi Siswa SMP/SMA (24 Pertemuan)
- **Target Audience / Key Personas**: Siswa SMP & SMA (Usia 12–18 tahun, Pemula hingga Lanjutan), Instruktur / Pengajar Coding LMS AGS
- **Required Presentation Language**: English. All student-facing slide copy, stories, explanations, analogies, instructions, challenges, button labels, IDE prompts, sample code strings, terminal output, and runtime/error messages must be written in clear, age-appropriate English. Indonesian may remain only in internal planning documents or developer comments that are never shown to students.
- **Primary Problem Solved**: Menyajikan modul materi Python & Bot Telegram yang terstruktur, sangat visual (bubbly flat design dengan ilustrasi Blob), interaktif (dapat menjalankan kode Python langsung di slide via Pyodide IDE), dan bertahap (40+ slide per sesi) sehingga siswa paham konsep abstrak melalui cerita dan contoh sehari-hari.

#### Key MVP Features (Must Have for Production v1.0)

1. **Slide Presentation HTML Standalone Per Sesi**: Dibuat 1 file HTML terpisah untuk setiap sesi/pertemuan (total 24 file HTML: `pertemuan-01.html` s.d. `pertemuan-24.html`).
2. **40+ Slide per Sesi**: Setiap file pertemuan HTML memiliki jumlah slide > 40 slide agar penyampaian materi detail, bertahap, dan mudah dicerna oleh anak-anak.
3. **Cerita Pengantar (Storytelling / Hook)**: Pembuka setiap topik disajikan melalui cerita yang relatable untuk siswa SMP/SMA (menggunakan karakter Blob).
4. **Penjelasan Resmi Konsep**: Penjelasan konsep dasar/teori formal yang disajikan secara ringkas dan menarik setelah cerita pengantar.
5. **Analogi & Contoh Sehari-hari**: Penjelasan konsep disertai contoh konkrit dalam kehidupan sehari-hari yang dapat dilihat dan dilakukan siswa.
6. **Eksekusi Kode Python Interaktif (Pyodide In-Browser IDE)**: Slide materi coding menyertakan IDE window dua panel (Editor + Output Terminal) yang dapat mengeksekusi kode Python langsung di HTML menggunakan Pyodide engine.
7. **Breakdown & Pembahasan Kode Detail**: Penjelasan potongan kode Python secara mendetail (baris per baris / blok per blok).
8. **Struktur Modular Sub-Topik Fleksibel (Alur Pembahasan Mendalam)**: Pembagian sub-topik dalam 1 sesi bersifat dinamis & fleksibel (misal 2 s.d. 4 sub-topik sesuai hasil analisis materi per sesi). Materi sebaiknya dipisah-pisah menjadi sub-topik terstruktur agar setiap poin mendapat penjelasan mendalam melalui alur (*Story -> Penjelasan Resmi -> Contoh Sehari-hari -> Contoh Kode Python -> Breakdown Kode*).
9. **Mini Project Bersama**: Di bagian akhir slide setiap sesi terdapat proyek praktis yang dikerjakan bersama instruktur dan siswa (kecuali proyek lanjutan dari minggu sebelumnya).
10. **3 Soal Challenge Mandiri**: 3 soal latihan/tantangan dengan tingkatan variatif untuk dikerjakan siswa di akhir sesi.
11. **Pengambilan Materi Berdasarkan Silabus**: Acuan topik dan alur materi disesuaikan dengan silabus 24 sesi pada [silabus.md](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/silabus.md) (Catatan: file ini berisi Silabus Kurikulum 24 Pertemuan; Lesson Plan detail untuk LMS akan dibuat secara terpisah di luar pembuatan slide presentasi).
12. **Alur Kerja QC Per Sesi**: Pembuatan dilakukan 1 file HTML per sesi terlebih dahulu agar dapat di-QC (Quality Control) oleh pengajar sebelum lanjut ke sesi berikutnya.
13. **English-Only Student Experience**: Seluruh teks yang terlihat atau dibaca siswa wajib menggunakan bahasa Inggris yang natural dan sesuai usia 12–18 tahun, termasuk teks di dalam contoh kode Python. Jangan mencampur bahasa Indonesia dan Inggris pada slide produksi.
14. **Bookmark Materi Wajib & Selalu Sinkron**: Setiap kali sebuah file materi `pertemuan-XX.html` atau file materi lain bernama `*generated.html` dibuat maupun diubah, AI/developer wajib langsung membuat atau memperbarui [bookmark.md](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/bookmark.md). Tulis satu link file di atas daftar, lalu tulis setiap bookmark sebagai baris teks polos dengan format persis `1 - 5 = Nama Materi`. Jangan memakai bullet, tabel, link pada rentang angka, atau tambahan keterangan lain. Rentang harus mengikuti isi slide aktual, tidak boleh ditebak hanya dari silabus.

#### Phase 2 Features (Nice to Have / Post-Launch)

1. **Mode Presenter / Teacher Notes**: Mode tampilan khusus pengajar dengan catatan instruktur per slide.
2. **Interactive Code Playground Tab**: Sandbox editor Python mandiri di slide untuk eksperimen siswa.
3. **Quiz Scoring & Progress Tracker**: System pelacak skor kuis dan progres slide siswa.
4. **Integration with Full LMS Lesson Plan**: Penyusunan dokumen Lesson Plan terperinci untuk LMS (dibuat terpisah setelah materi slide presentasi selesai).

---

## 2. Technical Stack & Architectural Blueprint

### Explanation

Explicitly defining the technology stack prevents the AI agent from picking incompatible libraries or writing code using different paradigms across files.

### Questionnaire & Details (Fill in below)

- **Frontend Framework**: Vanilla HTML5, CSS3, JavaScript (ES6+), Pyodide v0.25.0 (`pyodide.js` engine untuk eksekusi Python langsung di browser)
- **Styling Library**: Custom CSS Design System berbasis [template.html](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/template.html) (Flat Design, Bubbly Blob Style, Google Fonts `Fredoka`, `Poppins`, & `Fira Code`)
- **Backend / Runtime**: Pure Static Frontend (Client-side execution via browser & GitHub Pages; Bot Telegram dijalankan di GitHub Codespaces / Python local)
- **Database System**: N/A (Static presentation slides)
- **ORM / Query Builder**: N/A
- **Authentication System**: N/A
- **State Management**: Vanilla JS Slide Navigation State (`currentSlideIndex`, Next/Prev button handlers, Keyboard Arrow Navigation) & Pyodide Async Execution Handler (`runPythonCode()`, `setStdout()`)
- **File Storage**: N/A
- **Hosting / Cloud Provider**: GitHub Pages (Host file HTML presentasi agar bisa diakses langsung saat mengajar)

- **GitHub Repository**: [github.com/madyazdhil/lms-ags.git](https://github.com/madyazdhil/lms-ags.git)
- **SSH Key Fingerprint**: `SHA256:BjHgN/mVw5zIaYGa4bKKJ/f9d2D8KJvhfHJgGbfAW5E`

---

## 3. Database Schema & Data Models

### Explanation

Providing exact table/collection structures, data types, primary keys, and relationships ensures the AI creates consistent API routes and type declarations.

### Questionnaire & Details (Fill in below)

- **Primary Data Entities**: Presentation Slide Elements, Pyodide Code Window (`.ide-container`), Mini Project Steps, Challenge Question Cards
- **Key Relationships**: Pertemuan/Sesi (1 File HTML) -> Sub-Topik Fleksibel (2 s.d. 4 Sub-Topik) -> 40+ Slide Items
- **Data Model / Slide Structure**:

```html
<!-- Generic Slide Structure Example -->
<div class="slide" id="slide-N">
    <div class="row/col h-full align-center gap-lg">
        <div class="w-half col">
            <span class="tag-pill" style="background: ...; color: ...;">Sub-Topik / Tag</span>
            <h2>Judul Slide</h2>
            <p>Penjelasan Materi / Story / Breakdown Kode</p>
        </div>
        <div class="w-half col align-center">
            <!-- SVG Blob Vector Illustration or Pyodide IDE Container -->
        </div>
    </div>
</div>
```

---

## 4. UI/UX & Design System Guidelines

### Explanation

AI agents generate far better UI when given explicit design tokens, typography rules, color palettes, and component guidelines instead of browser defaults.

### Questionnaire & Details (Fill in below)

- **Design Aesthetic / Vibe**: Bubbly, Bright, Fun, Modern Flat Design dengan Karakter Animated Blob SVG & macOS-Style Pyodide IDE (Sesuai [template.html](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/template.html))
- **Color Palette**:
  - Outer Workspace BG: `#F3EFE9` (Warm grey/cream)
  - Slide Canvas BG: `#FFFDF9` (Clean warm cream)
  - Primary Blue Accent: `#447EE0`
  - Light Blue Accent: `#4AB2D9`
  - Orange Accent: `#EF6C35`
  - Yellow Accent: `#E8AA24`
  - Pink Accent: `#E0356D` / `#F47C9E`
  - Purple Accent: `#9A53E0`
  - Green Accent: `#48A850`
  - Primary Text: `#2A2A35` (Dark Slate)
  - Muted Text: `#6C6C82`
  - IDE Background: `#1E1E2E` (Dark Slate Code Window)
  - IDE Text Color: `#A6E22E` (Vibrant Neon Green)
- **Typography Font Family**: 
  - Headings & Bubbly Titles: `'Fredoka', sans-serif` (Weights: 400, 600, 700)
  - Body Text & Subtitles: `'Poppins', sans-serif` (Weights: 400, 500, 600, 800)
  - Code Editor & IDE Output: `'Fira Code', monospace` (Weight: 500)
- **UI Components & Icons Library**: Custom SVG Blobs (Pink Blob, Blue Cloud, Orange Star, Arch Blob, Green Spiky, Purple Flower), Step Pills, Tag Pills, Flat Cards, macOS-Style IDE Window (`.ide-window` dengan dot merah/kuning/hijau), Custom Scrollbar Slide.
- **Design System Rules**:
  - **Template Baseline**: Wajib menginduk penuh pada struktur dan variabel CSS di [template.html](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/template.html)
  - **Border Radius**: Sangat rounded (`border-radius: 40px` untuk wadah presentasi utama, `35px` / `25px` untuk kartu & jendela IDE, `50px` untuk tombol pill dan step pill)
  - **Motion / Animations**: Floating Blob (`@keyframes float`), transisi slide cubic-bezier (`transition: opacity 0.6s, transform 0.6s`), micro-interactions hover.

---

## 5. Coding Standards & Agent Guidelines (`AGENTS.md`)

### Explanation

Rules defined here tell the AI agent what coding patterns are required or strictly forbidden.

### Questionnaire & Details (Fill in below)

- **File & Folder Structure Pattern**:
  ```text
  LMS-ags/materi-smt2/
  ├── template.html
  ├── checklist.md
  ├── bookmark.md
  ├── silabus.md
  ├── pertemuan-01.html
  ├── pertemuan-02.html
  ├── ...
  └── pertemuan-24.html
  ```
- **Naming Conventions**:
  - File HTML: `pertemuan-01.html` s.d. `pertemuan-24.html` (2 digit zero-padded)
  - Indeks bookmark: `bookmark.md` (satu file pusat untuk semua materi HTML)
  - Slide ID: `slide-1`, `slide-2`, ..., `slide-N` (1-indexed)
  - Class CSS: `slide`, `btn`, `btn-primary`, `card`, `step-pill`, `tag-pill`, `blob-svg`, `ide-container`, `ide-window`, `ide-editor`, `ide-output-container`, `btn-run`
- **Error Handling Policy**: Pyodide error output disajikan dalam pesan berwarna pink cerah di kontainer terminal output tanpa memutus layout slide.
- **Forbidden Packages / Patterns**: Dilarang menggunakan CSS framework eksternal yang tidak diminta (Tailwind/Bootstrap), dilarang menggunakan JS bundler rumit. Harus berbentuk file HTML static mandiri per sesi yang bisa langsung dibuka di browser.
- **Language Standard**: Use concise international English, short sentences, familiar school-age vocabulary, and consistent technical terms. Preserve official product labels such as GitHub, Codespaces, Source Control, Commit, Sync Changes, Python, and Telegram exactly as shown in their interfaces.
- **Mandatory English Gate**: A material HTML file is not complete and must not be handed off, published, or marked as QC-ready while any student-facing Indonesian text remains. This applies to titles, navigation, stories, instructions, quizzes, buttons, code strings, prompts, output examples, loading states, success messages, and error messages. Internal Markdown planning notes and non-rendered developer comments may use Indonesian.
- **Bookmark Update Workflow**: After generating or editing any material HTML, count its final slides, identify the actual topic boundaries, and update `bookmark.md` in the same task. Put the material file link once above its bookmark list, then use only plain `start - end = topic` lines. Do not postpone the bookmark update to a later session.
- **Deep-Link Requirement**: Every material HTML must read `#slide-N` on initial load and on `hashchange`, activate the requested slide when valid, and keep the URL hash synchronized when the learner navigates. Invalid or missing hashes must safely fall back to slide 1.

---

## 6. Environment Variables & Third-Party Integrations

### Explanation

Lists all external services, APIs, and credentials needed for both development and production.

### Questionnaire & Details (Fill in below)

- **Third-Party Services Needed**:
  - Google Fonts API (`Fredoka`, `Poppins`, & `Fira Code`)
  - Pyodide Engine CDN (`https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js`)
  - Telegram Bot API / BotFather (untuk integrasi praktek Sesi 7–24)
  - GitHub & Codespaces (lingkungan praktikum siswa)
- **Required `.env` Variables**: None (Aplikasi slide frontend static)
- **Staging / Sandbox Setup**: Preview browser lokal (`file://` atau `http-server`) dan testing deployment di GitHub Pages.

---

## 7. Testing & Quality Verification Plan

### Explanation

Specifies how the agent or developer should verify that features work correctly before declaring completion.

### Questionnaire & Details (Fill in below)

- **Testing Framework**: QC Manual Browser Verification (Menjaga kualitas tampilan, alur slide, dan fungsionalitas tombol/Pyodide IDE)
- **Core Acceptance Criteria (Definition of Done)**:
  - [ ] 24 File Pertemuan HTML dibuat secara bertahap per sesi (`pertemuan-01.html` s.d. `pertemuan-24.html`).
  - [ ] Jumlah slide per sesi > 40 slide.
  - [ ] Memenuhi alur 5 komponen (*Story -> Penjelasan Resmi -> Contoh Sehari-hari -> Contoh Kode Python + Pyodide IDE -> Breakdown Kode*) yang disajikan secara mendalam per sub-topik.
  - [ ] Terdapat 1 Mini Project Bersama di akhir tiap sesi.
  - [ ] Terdapat 3 Soal Challenge di akhir tiap sesi.
  - [ ] Navigasi Slide (Next, Prev, Keyboard Arrow Left/Right) berjalan lancar.
  - [ ] Eksekusi kode Python di Pyodide IDE (`#python-code` -> `#run-btn` -> `#python-output`) berfungsi mulus.
  - [ ] Tampilan konsisten dengan UI/UX [template.html](file:///Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/materi-smt2/template.html).
  - [ ] Seluruh student-facing content menggunakan bahasa Inggris tanpa sisa teks bahasa Indonesia, termasuk tombol navigasi, prompt IDE, output, challenge, dan pesan error.
  - [ ] `bookmark.md` sudah dibuat/diperbarui pada task yang sama, mencakup seluruh rentang materi dari slide pertama sampai terakhir tanpa celah atau tumpang tindih.
  - [ ] Setiap bagian bookmark memiliki satu link file di atasnya dan baris rentang berformat persis `1 - 5 = Nama Materi` tanpa bullet atau link tambahan.
- **Verification Commands to Run**: Buka file HTML di browser lokal (`open pertemuan-XX.html` atau `npx http-server .`), uji navigasi tombol dan eksekusi Pyodide IDE.

---

## 8. Security & Performance Policies

### Explanation

Ensures production security compliance, rate limiting, and performance standards.

### Questionnaire & Details (Fill in below)

- **Authentication & Authorization Policy**: Open Access (Materi edukasi publik)
- **Database Security Rules**: N/A
- **Performance Targets**: Transisi slide 60fps (< 16ms), inisialisasi Pyodide engine responsif.
- **Rate Limiting / CORS Policy**: Standard HTTPS CDN asset loading.

---

## 9. CI/CD, Deployment & Post-Production

### Explanation

Details how the app will be built, deployed to production, monitored, and maintained after launch.

### Questionnaire & Details (Fill in below)

- **Build Command**: Static HTML (Tanpa proses kompilasi/build)
- **Deployment Platform & Target**: GitHub Pages (Repository `madyazdhil/lms-ags`)
- **Domain Name**: GitHub Pages URL (`https://madyazdhil.github.io/lms-ags/materi-smt2/pertemuan-XX.html`)
- **Error Tracking & Telemetry**: QC Manual per file sesi sebelum dipublikasikan
- **Analytics Platform**: N/A / GitHub Traffic Insights
- **Post-Launch Maintenance Plan**: Penyesuaian materi berkala sesuai perkembangan feedback siswa di kelas.
