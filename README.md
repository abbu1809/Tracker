# Interview Practice Tracker. 🎯

A refined, gallery-white, feature-based React Vite dashboard engineered for students and engineers to systematically track weekly interview preparation across **DSA**, **Git**, **Technical concepts**, and **Machine Coding**.

Designed with **Mobbin-inspired aesthetics** (monochrome canvas, stadium pills, 24px cards, 30% squircle icons, zero drop shadows, electric blue accents), built with **React 19**, **Vite**, **React Router v7**, **React Hook Form**, and **Tailwind CSS**.

---

## 🚀 Key Features

1. **Dashboard Overview**:
   - **Total Questions & Solved Count**: High-level summary of your prep workload.
   - **DSA Problems Solved**: Dedicated tracker for algorithmic questions with visual completion percentage.
   - **Interview Questions**: Completed technical and Git workflow challenges.
   - **Machine-Coding Status**: Status breakdown (completed, in-progress, queued) for frontend/component rounds.
   - **Visual Completion Ring**: Donut percentage chart updating dynamically with stored questions.
   - **Difficulty Distribution**: Performance breakdown across Easy, Medium, and Hard tiers.

2. **Question Tracker**:
   - **Add & Edit Questions**: Modal forms powered by **React Hook Form** with real-time validation (title length, categories, difficulty, URL validation).
   - **Categorization**: Tag questions by `DSA`, `Git`, `Technical`, or `Machine Coding`.
   - **Difficulty Levels**: `Easy`, `Medium`, and `Hard`.
   - **Status Workflow**: `Pending`, `In Progress`, and `Completed` (triggers celebration confetti on completion!).
   - **Dual Views**: Toggle between modern **Card Grid** view and a compact desktop **Table** view.

3. **Search & Real-Time Filters**:
   - Instant text search matching title, notes, and topic tags.
   - Filter pills and dropdowns for Category, Difficulty, and Status.
   - Multi-option sorting (Newest, Oldest, Difficulty level, Alphabetical).
   - Quick one-click "Reset filters".

4. **Dedicated Machine Coding Section**:
   - Focused round tracking for real-world frontend challenges (e.g. Autocomplete, Infinite Scroll, LRU cache).

5. **Persistence**:
   - Automatic synchronization to browser **LocalStorage** (`interview_prep_tracker_v1`).
   - Pre-loaded with curated demo data for instant out-of-the-box exploration.
   - "Reset Demo Data" action button to easily restore sample questions.

6. **Responsive UX & States**:
   - Desktop and Mobile layouts with responsive navigation drawer and sticky header.
   - Dedicated **Empty State** (when no questions exist) and **No-Search-Results State** (when filters yield no matches).
   - Accessible dialog modals, focus rings, and clean micro-interactions.

---

## 🏗️ Feature-Based Architecture

The project adheres to a clean, scalable feature-driven architecture:

```text
src/
├── app/
│   ├── AppRoutes.jsx            # React Router route definitions
│   └── Layout.jsx               # Common page shell (Navbar, container, footer)
│
├── features/
│   ├── dashboard/
│   │   ├── api/
│   │   │   └── dashboardApi.js  # Metric calculations & aggregations
│   │   ├── hooks/
│   │   │   └── useDashboardStats.js # Hook computing totals & completion rates
│   │   └── ui/
│   │       ├── CategoryProgress.jsx # Category progress bar breakdowns
│   │       ├── DashboardPage.jsx    # Primary dashboard layout
│   │       ├── MetricCard.jsx       # Reusable KPI card with trend bars
│   │       ├── ProgressRing.jsx     # Visual SVG completion circle
│   │       └── RecentQuestionsList.jsx # Recent activity feed
│   │
│   ├── questions/
│   │   ├── api/
│   │   │   └── questionsApi.js  # LocalStorage CRUD and seed data operations
│   │   ├── hooks/
│   │   │   ├── useQuestions.js  # State access hook
│   │   │   └── useQuestionFilters.js # Multi-criteria filtering & sorting hook
│   │   ├── state/
│   │   │   └── QuestionsContext.jsx  # Global questions context & celebration trigger
│   │   └── ui/
│   │       ├── EmptyState.jsx        # Zero-data and zero-results fallback views
│   │       ├── QuestionCard.jsx      # Mobile/Grid question item card
│   │       ├── QuestionFilters.jsx   # Search & filter toolbar
│   │       ├── QuestionFormModal.jsx # React Hook Form add/edit dialog
│   │       ├── QuestionsPage.jsx     # Full questions page view
│   │       └── QuestionTable.jsx     # Desktop data table view
│   │
│   └── machine-coding/
│       └── ui/
│           └── MachineCodingPage.jsx # Dedicated machine coding challenges screen
│
├── components/
│   ├── ui/
│   │   ├── Badge.jsx            # Status, difficulty & category badges
│   │   ├── Button.jsx           # Button with color variants & sizes
│   │   ├── Input.jsx            # Form input with validation error states
│   │   ├── Modal.jsx            # Accessible dialog modal
│   │   └── Select.jsx           # Custom select component
│   └── Navbar.jsx               # Responsive header with mobile drawer
│
├── utils/
│   ├── sampleData.js            # Initial curated interview problems
│   └── storage.js               # LocalStorage read/write wrappers
│
├── App.jsx                      # App root with Providers
├── index.css                    # Tailwind CSS configuration
└── main.jsx                     # Vite React entry point
```

---

## 🛠️ Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📋 Assumptions & Design Decisions
- **Persistence**: Used browser `LocalStorage` so student progress persists between browser reloads without requiring an external backend or database setup.
- **Initial Seed Data**: Pre-seeded with 10 real interview questions (DSA, Git, Technical, Machine Coding) so reviewers can test filtering, statistics, and editing immediately.
- **Form Handling**: Used `react-hook-form` with validation rules (required titles with minimum length, valid URLs when provided) to prevent invalid state entry.
- **Confetti Celebration**: Integrated lightweight `canvas-confetti` when questions are transitioned to "Completed" to gamify the interview prep journey.
