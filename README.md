# 🎓 LMS Alta Global School (LMS-AGS)

> **Extracurricular Learning Management System**  
> A unified, friction-free learning portal for students to access session recordings, interactive lesson materials, live meeting links, and automated teacher attendance logging.

---

## ✨ Features

- **🚀 Passwordless Access**: Direct, friction-free student portal with persistent session memory (`localStorage`).
- **📅 Interactive Dashboard (`index.html`)**: Real-time announcements feed, weekly class schedule, and fast-track action buttons.
- **📚 Session Player & Sandboxes (`class-sessions-meet.html`)**: Side-by-side view featuring video session recordings alongside interactive iframe material sandboxes with timestamped bookmarks.
- **📋 Lesson Plan Explorer (`lesson-plan.html`)**: Interactive weekly roadmap cards with modal details and Google Docs embeds.
- **🤖 Cloud Teacher Auto-Attendance**:
  - **Google Apps Script Backend (`code.gs`)**: Automatically detects when a session is set to `Active` with a valid execution date (Columns E & F) in Google Sheets (`EXC-SMT2`) and marks attendance.
  - **Playwright Automation (`automate_absen.js`)**: Headless browser automation that populates and submits the Airtable Teacher Attendance Form.
  - **GitHub Actions Workflow (`.github/workflows/auto-absen.yml`)**: Automated cloud runner executing attendance sync 24/7 without needing a local machine.

---

## 🏗️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla JavaScript (ES6+), CSS Custom Properties |
| **Styling & Motion** | Glassmorphism UI, Flexbox/Grid, GSAP (GreenSock Animation Platform) |
| **Icons** | Lucide Icons (CDN / SVG) |
| **Backend API** | Google Apps Script (`code.gs`) Web App |
| **Database** | Google Sheets (`EXC-SMT2` Headless CMS) |
| **Automation** | Node.js, Playwright, GitHub Actions |
| **Hosting** | GitHub Pages |

---

## 📂 Project Structure

```text
LMS-ags/
├── .github/
│   └── workflows/
│       └── auto-absen.yml        # GitHub Actions cloud automation runner
├── assets/                       # Image assets and avatars
├── materi-smt2/                  # Interactive HTML materials per session
├── index.html                    # Main Student Dashboard
├── class-sessions.html           # Grid view of all class sessions
├── class-sessions-meet.html      # Interactive Video & Sandbox Player
├── lesson-plan.html              # Weekly Lesson Plan Roadmap
├── login.html                    # Passwordless Login page
├── styles.css                    # Glassmorphism Design Tokens & CSS System
├── app.js                        # Shared API Client & GSAP Micro-interactions
├── code.gs                       # Google Apps Script Web App Backend
├── automate_absen.js             # Playwright Airtable Form Auto-Attendance Script
├── package.json                  # Node.js dependencies & scripts
└── README.md                     # Project Documentation
```

---

## 🤖 Auto-Attendance Setup

### 1. Google Apps Script (`code.gs`)
- Open your Google Spreadsheet containing the `EXC-SMT2` tab.
- Copy the code from [`code.gs`](code.gs) into your Google Apps Script editor.
- Deploy as **Web App** (*Execute as: Me*, *Access: Anyone*). After changing
  `code.gs`, create a new deployment/version; an old deployment keeps running
  the old code.
- When you set **Column E** to `Active` and fill in **Column F** with the class date, Apps Script will flag the session as `Ready for Auto-Absen` and update Column N upon submission.

### 2. Playwright Automation (`automate_absen.js`)
To run manually on demand:
```bash
npm install
npx playwright install chromium
npm run absen
```

### 3. GitHub Actions (100% Cloud Execution)
The workflow in `.github/workflows/auto-absen.yml` runs on the configured
schedule and reads pending sessions from the Apps Script Web App URL. Set the
repository secret `GAS_WEB_APP_URL` to the **current `/exec` URL** of the
deployment. The workflow fails fast if that secret is missing or the endpoint
does not answer `action=ping`; it no longer silently uses a stale hardcoded URL.

To publish `code.gs` from GitHub, run the manual
`.github/workflows/deploy_apps_script.yml` workflow with repository secrets
`CLASP_SCRIPT_ID` and `CLASP_TOKEN`. The Apps Script project ID must be the
actual LMS-AGS project (do not use an unrelated project returned by `clasp
list`).

---

## 📄 License & Credits
Built for **Alta Global School Extracurricular Program**. Developed by **Ahmad Yazid Hilmi**.
