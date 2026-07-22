# Production Readiness & AI Context Checklist

Welcome! This document serves as the master blueprint and single source of truth for AI agents (including Antigravity) to understand, build, test, and deploy your production application.

---

## 1. Product & Scope Definition (PRD & Core Vision)

### Explanation

Before writing code, AI agents need to understand the core purpose of the application, who the target users are, what problem it solves, and the MVP (Minimum Viable Product) scope vs. future features.

### Questionnaire & Details

- **Project Name**: LMS Alta Global School Extracurricular (LMS-AGS)
- **Core Value Proposition / Tagline**: Streamlined, hassle-free Extracurricular Learning Management System for students to access session recordings, interactive lesson materials, live meeting links, and detailed lesson plans in one unified workspace.
- **Target Audience / Key Personas**: Students, Parents, and Instructors of Alta Global School Extracurricular Program.
- **Primary Problem Solved**: Eliminates login friction for young students with passwordless authentication, solves fragmented class materials by presenting video recordings side-by-side with interactive material sandboxes, timestamped video bookmarks, and Google Docs lesson plans.

#### Key MVP Features (Must Have for Production v1.0)

1. **Direct Open Access (No Login Required)**: Instant access for students without any login wall. Displays a welcoming "Halo Students!" header on entry.
2. **Student Dashboard (`index.html`)**: Displays "Halo Students" greeting header, announcements feed, weekly schedule, and Fast Track quick-action buttons (Google Meet live link, Lesson Plans, Class Materials).
3. **Class Sessions Overview (`class-sessions.html`)**: Grid/cards view showing upcoming and past class sessions, material tags, meeting status badges, and direct launch buttons.
4. **Interactive Session Recording & Material Player (`class-sessions-meet.html`)**: Detailed session page featuring a video player for session recordings side-by-side with an iframe sandbox showing class materials explained by the teacher. Includes timestamped video bookmarks and section bookmarks for quick navigation.
5. **Interactive Lesson Plan (`lesson-plan.html`)**: Weekly lesson plan roadmap with clickable topic cards that expand into modal popups showcasing Google Docs lesson details and learning objectives.

#### Phase 2 Features (Nice to Have / Post-Launch)

- Student attendance tracking & submission checklist.
- Real-time quiz/poll widget during live sessions.
- Parent view toggle for monitoring progress.

---

## 2. Technical Stack & Architectural Blueprint

### Explanation

Explicitly defining the technology stack prevents the AI agent from picking incompatible libraries or writing code using different paradigms across files.

### Questionnaire & Details

- **Frontend Framework**: HTML5 (Semantic Structure) + Modern Vanilla JavaScript (ES6+ Modules)
- **Styling Library**: Vanilla CSS3 (CSS Custom Properties design tokens, Flexbox/CSS Grid, Glassmorphism aesthetics)
- **Animation Framework**: GSAP (GreenSock Animation Platform) for smooth transitions & micro-interactions
- **Icons Library**: Lucide Icons (via CDN / SVG icons)
- **Backend / Runtime**: Google Apps Script (`code.gs`) Web App returning JSON formatted data
- **Database System**: Google Sheets (Multi-tab database acting as a headless CMS and user store)
- **Authentication System**: Passwordless Email Lookup via Google Apps Script API + `localStorage` session persistence
- **Hosting / Cloud Provider**: GitHub Pages (Free static hosting with SSL)

---

## 3. Database Schema & Data Models

### Explanation

Providing exact table/collection structures, data types, primary keys, and relationships ensures the AI creates consistent API routes and type declarations.

### Questionnaire & Details

- **Primary Data Entities**: `Students`, `Announcements`, `Sessions`, `SessionBookmarks`, `LessonPlans`

#### Google Sheets Structure (Tabs & Schema):

1. **`Students` Tab**:
   | Column Name | Type | Description |
   |---|---|---|
   | `student_id` | String (PK) | Unique ID (e.g. `STU001`) |
   | `email` | String (Index) | Student email address |
   | `full_name` | String | Student full name |
   | `class_name` | String | Class grade / cohort name |
   | `avatar_url` | String | Student profile image URL |
   | `meet_link` | String | Direct Google Meet live class URL |

2. **`Announcements` Tab**:
   | Column Name | Type | Description |
   |---|---|---|
   | `id` | String (PK) | Announcement ID |
   | `title` | String | Headline text |
   | `content` | String | Detailed announcement message |
   | `date` | String (ISO) | Published date |
   | `category` | String | Tag (e.g. `Important`, `General`, `Assignment`) |
   | `priority` | String | `High`, `Normal`, `Low` |

3. **`Sessions` Tab**:
   | Column Name | Type | Description |
   |---|---|---|
   | `id` | String (PK) | Session ID (e.g. `SESS01`) |
   | `week_num` | Number | Week number |
   | `title` | String | Session title |
   | `date` | String | Class date |
   | `description` | String | Summary of topics covered |
   | `recording_url` | String | Video recording embed/stream URL |
   | `material_embed_url` | String | Web interactive material / slides iframe URL |
   | `thumbnail_url` | String | Card cover image URL |
   | `status` | String | `Live`, `Completed`, `Upcoming` |

4. **`SessionBookmarks` Tab**:
   | Column Name | Type | Description |
   |---|---|---|
   | `id` | String (PK) | Bookmark ID |
   | `session_id` | String (FK) | Reference to `Sessions.id` |
   | `target_type` | String | `video` or `material` |
   | `time_seconds` | Number | Timestamp in seconds (for video jump) |
   | `section_label` | String | Section title / anchor (for material jump) |
   | `title` | String | Bookmark label shown in UI |
   | `description` | String | Brief note about what happens at this point |

5. **`LessonPlans` Tab**:
   | Column Name | Type | Description |
   |---|---|---|
   | `id` | String (PK) | Lesson Plan ID |
   | `week_num` | Number | Week number |
   | `topic` | String | Main topic name |
   | `summary` | String | Quick summary bullet points |
   | `gdoc_url` | String | Google Docs view link / preview embed link |
   | `status` | String | `Upcoming`, `In Progress`, `Completed` |

---

## 4. UI/UX & Design System Guidelines

### Explanation

AI agents generate far better UI when given explicit design tokens, typography rules, color palettes, and component guidelines instead of browser defaults.

### Questionnaire & Details

- **Design Aesthetic / Vibe**: Sleek Modern Dark Mode with Glassmorphism, subtle glowing accents, floating card layouts, and polished GSAP micro-animations.
- **Color Palette**:
  - Background Base: `#0b0f19` (Deep Obsidian Sky)
  - Card / Surface (Glass): `rgba(22, 31, 48, 0.75)` with `backdrop-filter: blur(16px)` and border `rgba(255, 255, 255, 0.08)`
  - Primary Accent: `#38bdf8` (Vibrant Electric Cyan)
  - Secondary Accent: `#8b5cf6` (Deep Purple Glow)
  - Text Primary: `#f8fafc` (Off-white)
  - Text Muted: `#94a3b8` (Cool Grey)
  - Success / Live Badge: `#10b981` (Emerald Green)
- **Typography**: Inter / Plus Jakarta Sans (Google Fonts) with crisp hierarchy (`h1` 2.25rem, `h2` 1.5rem, body 1rem).
- **Icons**: Lucide SVG Icons (`user`, `calendar`, `video`, `file-text`, `bookmark`, `play-circle`, `external-link`, `arrow-right`, `bell`).
- **Wireframes**: Available at `/Users/yazidhilmi/Documents/Edu/Personal_pro/LMS-ags/design-scetch-wireframe`

---

## 5. Coding Standards & Agent Guidelines (`AGENTS.md`)

### Questionnaire & Details

- **File & Folder Structure**: Single-level modular root directory for static site deployment:
  - `login.html`, `index.html`, `class-sessions.html`, `class-sessions-meet.html`, `lesson-plan.html`
  - `styles.css` (Master CSS design system & utilities)
  - `app.js` (Shared API client, state, GSAP transitions)
  - `code.gs` (Google Apps Script backend script file)
- **Naming Conventions**: `kebab-case` for HTML files and CSS classes, `camelCase` for JS functions and variables.
- **Error Handling Policy**: Graceful API fallbacks. If Google Apps Script URL is empty or fails, frontend automatically falls back to clean mock data so the app remains fully interactive during local development.

---

## 6. Environment Variables & Third-Party Integrations

### Questionnaire & Details

- **Third-Party Services**: Google Apps Script, Google Sheets, GSAP CDN, Google Fonts.
- **Config Constants**:
  - `APPS_SCRIPT_URL`: Google Apps Script deployed Web App execution URL.
- **GitHub Repository**: [github.com/madyazdhil/lms-ags.git](https://github.com/madyazdhil/lms-ags.git)
- **SSH Key**: `SHA256:BjHgN/mVw5zIaYGa4bKKJ/f9d2D8KJvhfHJgGbfAW5E`

---

## 7. Testing & Quality Verification Plan

### Questionnaire & Details

- **Core Acceptance Criteria**:
  - [x] Passwordless email login saves session into `localStorage`.
  - [x] Dashboard (`index.html`) shows student info, announcements, weekly dates, and quick action launch buttons.
  - [x] Class Sessions (`class-sessions.html`) lists all session cards cleanly.
  - [x] Detailed Session Meet (`class-sessions-meet.html`) embeds video recording and material iframe sandbox with functional video & section bookmarks.
  - [x] Lesson Plan (`lesson-plan.html`) presents roadmap cards opening modal popups with Google Docs previews.
  - [x] Fully responsive across Desktop (1440px), Tablet (768px), and Mobile (375px).
- **Verification Command**: Local browser preview via static server or direct file inspection.

---

## 8. Security & Performance Policies

### Questionnaire & Details

- **Security**: Sanitization of user input, HTML iframe sandbox attribute (`sandbox="allow-scripts allow-same-origin allow-popups"`), CORS headers in Google Apps Script.
- **Performance**: GSAP lightweight animation triggers, hardware-accelerated CSS transforms (`translate3d`), responsive image scaling.

---

## 9. CI/CD & Deployment

### Questionnaire & Details

- **Deployment Platform**: GitHub Pages (`main` branch static root hosting)
- **Backend Deployment**: Google Apps Script -> Deploy as Web App -> Execute as `Me` -> Who has access: `Anyone`.
