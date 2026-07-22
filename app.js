/**
 * LMS Alta Global School (LMS-AGS) - Shared Client Logic
 * Google Spreadsheet Integration (`EXC-SMT2`)
 */

const CONFIG = {
  // Deployed Google Apps Script Web App URL
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxSze-Gb7Sz7RPb9t-a_1WW887-iVee-hho6bGQ_Tv2zGWsUxiZdPKK4W7TkC7pY1rZ/exec",
  STORAGE_KEY: "LMS_AGS_USER_SESSION"
};

// Default Mock Data matching spreadsheet tab `EXC-SMT2`
const MOCK_DATA = {
  student: {
    student_id: "STU-101",
    email: "student@altaglobalschool.sch.id",
    full_name: "Student",
    class_name: "Coding Club TA 2025/2026",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    meet_link: "https://meet.google.com/pka-dbwt-tez"
  },
  announcements: [
    {
      id: "ANN01",
      title: "🚀 Sesi Live Coding Bot Telegram Dimulai!",
      content: "Setiap hari Rabu pukul 18:30 – 19:30 WIB. Pastikan Codespaces dan Telegram sudah siap!",
      date: "July 22, 2026",
      category: "Important",
      priority: "High"
    },
    {
      id: "ANN02",
      title: "📢 Link Google Meet Resmi",
      content: "GMeet: https://meet.google.com/pka-dbwt-tez | Dial: (US) +1 501-939-4159 PIN: 954 611 033#",
      date: "July 20, 2026",
      category: "General",
      priority: "Normal"
    }
  ],
  sessions: [
    // FASE 1: Fondasi "Cloud", "Save Game", dan Python (Sesi 1-6)
    { id: "SESS01", week_num: 1, fase: "FASE 1", pertemuan: "Sesi 1", title: "Sesi 1: Perkenalan GitHub & Markas Codespaces", date: "July 22, 2026", description: "Membuat Repository di GitHub dan meluncurkan Codespaces. Pengenalan antarmuka IDE (Explorer, Editor, Terminal). Penjelasan konsep Server/Cloud.", recording_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", tambahan_materi: "<div style='font-family:sans-serif; padding:20px;'><h2 style='color:#0B1B42;'>📌 Summary & Catatan Tambahan Sesi 1</h2><p style='color:#4A5568;'>1. Buka github.com lalu buat repository public baru bernama <strong>bot-telegram-ku</strong>.</p><p style='color:#4A5568;'>2. Klik tombol <strong>Code</strong> -> <strong>Codespaces</strong> -> <strong>Create codespace on main</strong>.</p><p style='color:#4A5568;'>3. Di terminal ketik: <code>python main.py</code> untuk menjalankan script pertama.</p></div>", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", thumbnail_url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=500&q=80", status: "Active" },
    { id: "SESS02", week_num: 2, fase: "FASE 1", pertemuan: "Sesi 2", title: "Sesi 2: Ritual Sync (Save Game) & Variabel", date: "July 29, 2026", description: "Cara menyimpan kode kembali ke GitHub tanpa terminal via UI Source Control dan pengenalan Variabel Python.", recording_url: "", tambahan_materi: "<div style='font-family:sans-serif; padding:20px;'><h2 style='color:#0B1B42;'>📌 Rangkuman Variabel</h2><p style='color:#4A5568;'>Variabel adalah wadah data. Contoh: <code>nama = 'Byte'</code>.</p></div>", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80", status: "Non Active" },
    { id: "SESS03", week_num: 3, fase: "FASE 1", pertemuan: "Sesi 3", title: "Sesi 3: Kalkulator Server (Tipe Data & Math)", date: "August 5, 2026", description: "Integer, Float, String. Operasi matematika dasar (+, -, *, /) dan script penghitung diskon.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS04", week_num: 4, fase: "FASE 1", pertemuan: "Sesi 4", title: "Sesi 4: Ngobrol Sama Komputer (User Input)", date: "August 12, 2026", description: "Menggunakan input() dan f-string (format teks) untuk wawancara interaktif.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS05", week_num: 5, fase: "FASE 1", pertemuan: "Sesi 5", title: "Sesi 5: Logika Bercabang (If-Else Dasar)", date: "August 19, 2026", description: "Memahami Boolean (True/False) dan percabangan if, elif, else untuk penentu logika.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS06", week_num: 6, fase: "FASE 1", pertemuan: "Sesi 6", title: "Sesi 6: Review & Mini Project Python", date: "August 26, 2026", description: "Menggabungkan Variabel, Input, dan If-Else dalam Game Text Adventure.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    
    // FASE 2: Membangkitkan Bot & Memahami Runtime (Sesi 7-12)
    { id: "SESS07", week_num: 7, fase: "FASE 2", pertemuan: "Sesi 7", title: "Sesi 7: Lahirnya Sang Bot (BotFather & Token)", date: "September 2, 2026", description: "Membuat bot di BotFather, penyiapan Token Rahasia, dan instalasi library telebot.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS08", week_num: 8, fase: "FASE 2", pertemuan: "Sesi 8", title: "Sesi 8: Konsep Runtime & Bot Beo", date: "September 9, 2026", description: "Konsep Runtime & Polling bot agar merespon balasan chat pengguna secara otomatis.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS09", week_num: 9, fase: "FASE 2", pertemuan: "Sesi 9", title: "Sesi 9: Bot yang Patuh Perintah (Command Handlers)", date: "September 16, 2026", description: "Membuat perintah khusus /start, /help, dan /sosmed menggunakan @bot.message_handler.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS10", week_num: 10, fase: "FASE 2", pertemuan: "Sesi 10", title: "Sesi 10: Bot yang Paham Teks (Text Handlers & If-Else)", date: "September 23, 2026", description: "Membaca teks chat biasa, menyaring kata-kata, dan memberikan respon otomatis.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS11", week_num: 11, fase: "FASE 2", pertemuan: "Sesi 11", title: "Sesi 11: Bot Ngirim Gambar (Media Handling)", date: "September 30, 2026", description: "Mengirim gambar dari URL internet dan stiker unik Telegram lewat bot.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS12", week_num: 12, fase: "FASE 2", pertemuan: "Sesi 12", title: "Sesi 12: Mini Project Bot Asisten (Evaluasi)", date: "October 7, 2026", description: "Menggabungkan command handlers, text filtering, dan media response ke dalam Bot Asisten.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },

    // FASE 3: Struktur Data & Alur Percakapan (Sesi 13-18)
    { id: "SESS13", week_num: 13, fase: "FASE 3", pertemuan: "Sesi 13", title: "Sesi 13: Rak Buku Server (List)", date: "October 14, 2026", description: "Struktur data List Python (append, remove, indexing) untuk menampung banyak data.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS14", week_num: 14, fase: "FASE 3", pertemuan: "Sesi 14", title: "Sesi 14: Mesin Pengulang (For Loop)", date: "October 21, 2026", description: "Pengulangan For Loop dan kombinasi logika pencarian di dalam List.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS15", week_num: 15, fase: "FASE 3", pertemuan: "Sesi 15", title: "Sesi 15: Daftar Menu Telegram (Integrasi List, Loop, Bot)", date: "October 28, 2026", description: "Menampilkan daftar menu interaktif berformat bullet points emoji di chat Telegram.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS16", week_num: 16, fase: "FASE 3", pertemuan: "Sesi 16", title: "Sesi 16: Loker Laci Ganda (Dictionary)", date: "November 4, 2026", description: "Konsep Key-Value di Dictionary Python sebagai fondasi menyimpan data user & skor.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS17", week_num: 17, fase: "FASE 3", pertemuan: "Sesi 17", title: "Sesi 17: Percakapan Berantai (Next Step Handler) Part 1", date: "November 11, 2026", description: "Alur percakapan bertahap menggunakan register_next_step_handler().", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS18", week_num: 18, fase: "FASE 3", pertemuan: "Sesi 18", title: "Sesi 18: Percakapan Berantai Part 2", date: "November 18, 2026", description: "Menyatukan alur percakapan bertingkat untuk kalkulator dan formulir bot.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },

    // FASE 4: Proyek Akhir - Bot Kuis Interaktif (Sesi 19-24)
    { id: "SESS19", week_num: 19, fase: "FASE 4", pertemuan: "Sesi 19", title: "Sesi 19: Memori Bot (State & Skor dengan Dictionary)", date: "November 25, 2026", description: "Menyimpan skor per User ID Telegram secara independen dalam dictionary global.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS20", week_num: 20, fase: "FASE 4", pertemuan: "Sesi 20", title: "Sesi 20: Merancang Pertanyaan Kuis", date: "December 2, 2026", description: "Menulis struktur soal & kunci jawaban kuis interaktif bot.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS21", week_num: 21, fase: "FASE 4", pertemuan: "Sesi 21", title: "Sesi 21: Validasi Jawaban Kuis", date: "December 9, 2026", description: "Logika validasi jawaban kuis, perhitungan skor akhir, dan penanganan case sensitivity.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS22", week_num: 22, fase: "FASE 4", pertemuan: "Sesi 22", title: "Sesi 22: Upgrade Visual (Custom Keyboard/Reply Markup)", date: "December 16, 2026", description: "Membuat tombol pilihan ganda (ReplyKeyboardMarkup) di bawah keyboard Telegram.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS23", week_num: 23, fase: "FASE 4", pertemuan: "Sesi 23", title: "Sesi 23: Final Debugging & Cleanup", date: "December 23, 2026", description: "Pembersihan kode, penyelesaian error handling, dan pembuatan pesan /start profesional.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" },
    { id: "SESS24", week_num: 24, fase: "FASE 4", pertemuan: "Sesi 24", title: "Sesi 24: Demo Day & Perayaan!", date: "December 30, 2026", description: "Presentasi proyek bot akhir, pengujian bot antar siswa, dan selebrasi pencapaian.", recording_url: "", tambahan_materi: "", material_embed_url: "materi-smt2/pertemuan-01.html", lesson_plan_link: "materi-smt2/pertemuan-01.html", status: "Non Active" }
  ],
  bookmarks: [
    { id: "BM01", session_id: "SESS01", slide_index: 0, section_label: "Cover", title: "Hal 1: Cover & Perkenalan", description: "Membangun rumah pertama untuk kode kita di Cloud" },
    { id: "BM02", session_id: "SESS01", slide_index: 4, section_label: "Subtopik 1", title: "Subtopik 1: Cloud & Server", description: "Apa sebenarnya komputer di internet itu?" },
    { id: "BM03", session_id: "SESS01", slide_index: 11, section_label: "Subtopik 2", title: "Subtopik 2: Repository GitHub", description: "Kotak proyek yang rapi, aman, dan punya riwayat" },
    { id: "BM04", session_id: "SESS01", slide_index: 20, section_label: "Subtopik 3", title: "Subtopik 3: GitHub Codespaces", description: "Ruang coding lengkap yang berjalan di cloud" },
    { id: "BM05", session_id: "SESS01", slide_index: 29, section_label: "Subtopik 4", title: "Subtopik 4: File Python & print()", description: "Memberi komputer perintah untuk menampilkan pesan" },
    { id: "BM06", session_id: "SESS01", slide_index: 43, section_label: "Mini Project", title: "Mini Project: Kartu Identitas", description: "Program memperkenalkan markas cloud dan pemiliknya" },
    { id: "BM07", session_id: "SESS01", slide_index: 47, section_label: "Challenge", title: "Challenge: ASCII Art & Poster", description: "Kreativitas gambar ASCII dan poster markas" }
  ],
  lessonPlans: [
    {
      id: "LP01",
      week_num: 1,
      topic: "Sesi 1: Perkenalan GitHub & Markas Codespaces",
      summary: "Membuat Repository di GitHub, setup Codespaces, pengenalan IDE terminal/editor, serta live coding print() ASCII Art.",
      gdoc_url: "materi-smt2/pertemuan-01.html",
      status: "Active"
    }
  ]
};

// ----------------------------------------------------
// AUTH & SESSION MANAGER
// ----------------------------------------------------
const Auth = {
  getUser() {
    const data = localStorage.getItem(CONFIG.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUser(userObj) {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(userObj));
  },

  logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    window.location.href = "index.html";
  },

  requireAuth() {
    let user = this.getUser();
    if (!user) {
      user = MOCK_DATA.student;
      this.setUser(user);
    }
    return user;
  }
};

// ----------------------------------------------------
// API CLIENT
// ----------------------------------------------------
async function fetchAPI(action, params = {}) {
  if (!CONFIG.APPS_SCRIPT_URL) {
    return getMockAPIResponse(action, params);
  }

  try {
    const query = new URLSearchParams({ action, ...params }).toString();
    const res = await fetch(`${CONFIG.APPS_SCRIPT_URL}?${query}`);
    const json = await res.json();
    if (json.status === 'success') {
      return json;
    } else {
      console.warn(`[LMS-AGS API] ${json.message}`);
      return getMockAPIResponse(action, params);
    }
  } catch (err) {
    console.error(`[LMS-AGS API Error]`, err);
    return getMockAPIResponse(action, params);
  }
}

function getMockAPIResponse(action, params) {
  switch (action) {
    case 'getSessions':
      return { status: 'success', data: MOCK_DATA.sessions };
      
    case 'getSessionDetail':
      const sessId = params.sessionId || 'SESS01';
      const sess = MOCK_DATA.sessions.find(s => s.id === sessId) || MOCK_DATA.sessions[0];
      const bms = MOCK_DATA.bookmarks.filter(b => b.session_id === sess.id);
      return { status: 'success', data: { session: sess, bookmarks: bms } };
      
    case 'getLessonPlans':
      const lps = MOCK_DATA.sessions.map(s => ({
        id: 'LP' + (s.week_num < 10 ? '0' + s.week_num : s.week_num),
        week_num: s.week_num,
        topic: s.title,
        summary: s.description,
        gdoc_url: s.lesson_plan_link || s.material_embed_url,
        status: s.status
      }));
      return { status: 'success', data: lps };
      
    default:
      return { status: 'success', data: null };
  }
}
