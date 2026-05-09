# Climbuddy

A gamified mobile web app for the climbing community — connecting climbers with partners, coaches, and venues.

**Live Demo:** https://brmrs.github.io/Climbuddy/

**CPT208 Human-Centric Computing · Group C2 — Go Climbers**  
Xi'an Jiaotong-Liverpool University · AY2025/26

---

## Team

| Name | Student ID | Role |
|---|---|---|
| Rui Zheng | 2362065 | Lead Developer |
| Jiutian Chang | 2362412 | Content & Research |
| Zhixian Zhou | 2360690 | Content & Testing |
| Xinyi Xiao | 2363303 | UI Design & Develop |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| UI Primitives | Radix UI (shadcn/ui) |
| Icons | Lucide React |
| State | React useState + localStorage |
| Hosting | GitHub Pages (via GitHub Actions) |

---

## Core Features

1. **Explore** — Browse and filter climbing venues with detailed info (route setter style, facilities, hours)
2. **Partners** — Smart partner matching by level, style, and availability; in-app chat with session booking
3. **Journey** — Personal climbing log, badges, calendar, health stats, and session history
4. **Boost** — Free technique videos, premium training courses, AI coach chat, and coach booking

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://brmrs.github.io/Climbuddy.git
cd Climbuddy
npm install
npm run dev
```

Open [http://localhost:5173/Climbuddy/](http://localhost:5173/Climbuddy/) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

Or push to `main` — GitHub Actions will auto-deploy.

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                  # Root component & state
│   ├── components/
│   │   ├── layout/              # BottomNav, Modal, ScreenHeader
│   │   ├── onboarding/          # WelcomeCards, SpotlightTour
│   │   ├── coach/               # CoachDetailScreen
│   │   ├── screens/
│   │   │   ├── explore/         # GymsTab, GymDetailScreen
│   │   │   ├── social/          # PartnersTab, ChatScreen, AddPartner
│   │   │   ├── journey/         # ProgressTab, Calendar, Badges, Health
│   │   │   └── boost/           # BoostTab, CourseDetail, AICoachChat
│   │   └── ui/                  # Shared UI primitives
│   ├── data/
│   │   └── mockData.ts          # All mock data (venues, coaches, partners)
│   ├── hooks/                   # useOnboarding, useMediaPicker
│   ├── types/                   # TypeScript interfaces
│   └── constants/               # Shared style tokens
public/
└── images/
    ├── coaches/                 # Coach avatar images
    └── courses/                 # Course thumbnail images
ai-logs/                         # AI-assisted development prompts
```

---

## Data Handling

User interaction state is managed entirely client-side:

- **Runtime state** — React `useState` with prop drilling (no external store)
- **Persistence** — `localStorage` under key `climbuddy_domain_state_v6`
- **Mock data** — All venues, coaches, partners, sessions defined in `src/app/data/mockData.ts`

State includes: session logs, calendar events, venue/coach/partner reviews, purchased course IDs, chat message threads, daily tasks, and user profile.

---

## AI Disclosure

AI tools were used for coding assistance under the module's permitted use policy.  
See [`ai-logs/`](./ai-logs/) for prompts used to generate core components.

| Tool | Use |
|---|---|
| Claude Sonnet 4.5 (Anthropic) | Core component scaffolding, logic debugging |
| Claude Opus 4.6 (Anthropic) | Feature design prompts, onboarding flow |
| Kimi K2.5 (Moonshot AI) | Calendar detail refinement |
| MiniMax M2.5 | UI adjustments, responsive layout |
| Claude Sonnet 4 (Anthropic) | Before/after evaluation screenshots |
