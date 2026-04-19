# Climbuddy 10-Feature Enhancement Plan

## TL;DR

> **Quick Summary**: Enhance the Climbuddy climbing app prototype with 10 interconnected features: new "Boost" tab for paid courses/AI training plans/coach integration, Journey page Calendar + badge timestamps, session recording enhancement (video + smartwatch data), venue review system, cross-tab navigation links, and standardized modal positioning.
> 
> **Deliverables**:
> - New "Boost" bottom tab (position 3) with free/paid courses, AI daily plan, coach section
> - Journey Calendar (monthly view + daily schedule, synced with social climbing dates)
> - Enhanced session recording (video upload, smartwatch data, fatigue level)
> - Venue review system (from Calendar expired bookings + read-only in gym detail)
> - Badge timestamps in detail view
> - Standardized fixed modal system across all screens
> - Cross-tab navigation (AI promo → Boost, tutorial "know more" → Boost)
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: T1 → T9 → T12 → T14 → T16 → FINAL

---

## Context

### Original Request
10 feature enhancements for Climbuddy climbing app prototype (React/Vite/Tailwind, Neobrutalist design, frontend-only mock data).

### Interview Summary
**Key Discussions**:
- **Sessions**: Recording should persist in history, support video upload + smartwatch data (heart rate, calories, fatigue level as progress bar + text). Note: SessionLog already has heartRate/calories fields.
- **Boost Tab**: New 4th tab at position 3 named "Boost" with Zap icon. Contains free/paid courses, AI daily plan (task cards), coach courses. Journey becomes purely historical data display.
- **Venue Reviews**: Only reviewable from Calendar expired bookings. 4 dimensions: environment, route design, equipment, value. Gym detail shows reviews read-only.
- **Calendar**: Monthly view + daily schedule list, above badges in Journey. Auto-syncs with Matches climbing dates + manual additions.
- **Modals**: Must be fixed above bottom nav bar, not scroll with page. Content scrollable within modal.
- **Testing**: No automated tests needed. Visual QA via Playwright only.

### Metis Review
**Critical Discoveries** (addressed):
- `SessionLog` already has `heartRate` and `calories` fields → only `videoUrl` and `fatigueLevel` are truly new
- Three incompatible modal implementations (ProgressTab, GymDetailScreen, PartnersTab) → shared Modal component needed FIRST
- `Coach` type has no `id` field → must add before coach-course linking
- Sessions are local state in ProgressTab → must lift to App.tsx for cross-component access
- No cross-tab navigation mechanism → must extend `navigate()` or pass `setActiveTab`

**Guardrails Applied**:
- Shared infrastructure built in Wave 1 before any features
- ProgressTab split into sub-components before enhancement
- All new UI follows `S.*` Neobrutalist style constants from `styles.ts`
- No new dependencies (no router, no state library, no video player)
- Max 6 mock items per new collection (courses, events, reviews)
- Phone frame 390×844px validated for 4-tab layout
- Video = thumbnail + fake player overlay (no actual `<video>` element)
- Calendar sync = pre-populated matching mock data, no live sync logic
- AI plan = hardcoded daily task list, no recommendation algorithm
- Reviews = write-once per venue visit, text optional (max 200 chars)

---

## Work Objectives

### Core Objective
Add 10 interconnected features to Climbuddy prototype, centered around a new "Boost" training tab, enhanced session recording, venue reviews, and a Journey Calendar — all using mock data and consistent Neobrutalist design.

### Concrete Deliverables
- `src/app/components/layout/Modal.tsx` — shared fixed-position modal
- `src/app/components/screens/boost/BoostTab.tsx` — new Boost tab main component
- `src/app/components/screens/boost/CourseDetailScreen.tsx` — course detail view
- `src/app/components/screens/journey/CalendarSection.tsx` — monthly calendar
- `src/app/components/screens/journey/ProfileCard.tsx` — extracted profile section
- `src/app/components/screens/journey/BadgeGrid.tsx` — extracted badges with timestamps
- `src/app/components/screens/journey/SessionHistory.tsx` — extracted session list with video
- Updated `BottomNav.tsx` with 4 tabs
- Updated `App.tsx` with lifted state + new screen/tab types
- Updated `mockData.ts` with courses, calendar events, reviews, coach courses
- Updated `types/index.ts` with all new TypeScript interfaces
- Updated `GymDetailScreen.tsx` with review display section
- Updated `GettingStartedScreen.tsx` with "know more" link

### Definition of Done
- [ ] `npm run build` passes with zero errors
- [ ] All 4 bottom tabs visible and navigable at 390px width
- [ ] Every modal fixed above bottom nav, content scrollable
- [ ] Boost tab shows free/paid courses, AI plan, coach section
- [ ] Journey Calendar shows monthly view with event dots
- [ ] Session recording includes video + smartwatch fields
- [ ] Badge detail shows earned date
- [ ] Venue review accessible from expired Calendar bookings
- [ ] Gym detail shows read-only reviews
- [ ] Tutorial ends with "know more" → Boost link

### Must Have
- All new UI uses `S.border`, `S.shadow`, `S.press` from `styles.ts`
- Phone frame renders correctly at 390×844px
- Cross-tab navigation works (Journey AI card → Boost, tutorial → Boost)
- Modal overlay covers full screen but modal content stops above bottom nav
- Badge detail shows "Not yet earned" for locked badges (no date)
- Calendar empty state: "No climbs this month" message
- Session without video still displays normally in history (no play button)
- Boost tab with no purchases: paid courses show lock/price, AI plan shows only free tasks

### Must NOT Have (Guardrails)
- No new npm dependencies (no router, no Zustand, no video player library)
- No actual date comparison logic for "expired bookings" — hardcode past dates in mock
- No AI recommendation algorithm — daily plan tasks are hardcoded
- No generic component library (`<Card>`, `<Button>` wrappers) — use `S.*` directly
- No actual video playback — thumbnail + play icon overlay only
- No multi-user state — everything from Emma's perspective
- No raw Tailwind borders/shadows — must use `S.*` constants
- No more than 6 mock items per new data collection

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (prototype project)
- **Framework**: N/A

### QA Policy
Every task MUST include Playwright visual QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **All UI tasks**: Use Playwright — navigate, interact, assert DOM elements, screenshot
- **Type safety**: `npx tsc --noEmit` after every type/interface change
- **Build health**: `npm run build` must pass after every task

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — all start immediately, max parallel):
├── T1: Types + Mock Data scaffolding [quick]
├── T2: Shared Modal component [quick]
├── T3: BottomNav 4 tabs + navigation [quick]
├── T4: Split ProgressTab sub-components [quick]
└── T5: Lift shared state to App.tsx [quick]

Wave 2 (Core Features — after Wave 1, 6 parallel):
├── T6: Badge timestamps + modal update (depends: T1, T2, T4) [quick]
├── T7: Session enhancement — form + history + video (depends: T1, T2, T4, T5) [unspecified-high]
├── T8: Journey Calendar — monthly + schedule (depends: T1, T4, T5) [visual-engineering]
├── T9: Boost Tab scaffold + courses layout (depends: T1, T2, T3) [visual-engineering]
├── T10: Gym detail review display (depends: T1, T2) [quick]
└── T11: Migrate existing modals to shared Modal (depends: T2, T4) [quick]

Wave 3 (Advanced Features — after Wave 2, 5 parallel):
├── T12: Boost AI daily plan section (depends: T1, T9) [visual-engineering]
├── T13: Boost coach section + courses (depends: T1, T9) [visual-engineering]
├── T14: AI analysis move Journey→Boost + promo card (depends: T4, T9) [unspecified-high]
├── T15: Venue review form from Calendar (depends: T1, T2, T5, T8, T10) [unspecified-high]
└── T16: Cross-tab links: AI promo + know more (depends: T3, T9, T14) [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high + playwright)
└── F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: T1 → T9 → T12/T14 → T16 → FINAL
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Wave 2)
```

### Dependency Matrix

| Task | Blocked By | Blocks | Wave |
|------|-----------|--------|------|
| T1 | — | T6-T16 | 1 |
| T2 | — | T6,T7,T9,T10,T11,T15 | 1 |
| T3 | — | T9,T16 | 1 |
| T4 | — | T6,T7,T8,T11,T14 | 1 |
| T5 | — | T7,T8,T15 | 1 |
| T6 | T1,T2,T4 | — | 2 |
| T7 | T1,T2,T4,T5 | — | 2 |
| T8 | T1,T4,T5 | T15 | 2 |
| T9 | T1,T2,T3 | T12,T13,T14,T16 | 2 |
| T10 | T1,T2 | T15 | 2 |
| T11 | T2,T4 | — | 2 |
| T12 | T1,T9 | — | 3 |
| T13 | T1,T9 | — | 3 |
| T14 | T4,T9 | T16 | 3 |
| T15 | T1,T2,T5,T8,T10 | — | 3 |
| T16 | T3,T9,T14 | — | 3 |

### Agent Dispatch Summary

- **Wave 1**: **5 tasks** — T1→`quick`, T2→`quick`, T3→`quick`, T4→`quick`, T5→`quick`
- **Wave 2**: **6 tasks** — T6→`quick`, T7→`unspecified-high`, T8→`visual-engineering`, T9→`visual-engineering`, T10→`quick`, T11→`quick`
- **Wave 3**: **5 tasks** — T12→`visual-engineering`, T13→`visual-engineering`, T14→`unspecified-high`, T15→`unspecified-high`, T16→`quick`
- **FINAL**: **4 tasks** — F1→`oracle`, F2→`unspecified-high`, F3→`unspecified-high`, F4→`deep`

---

## TODOs

- [x] 1. Extend TypeScript Types + Scaffold Mock Data

  **What to do**:
  - In `src/app/types/index.ts`:
    - Add `earnedDate?: string` to `Badge` interface
    - Add `id: string` to `Coach` interface
    - Add `videoUrl?: string` and `fatigueLevel?: number` (1-10) to `SessionLog` interface
    - Create `Course` interface: `{ id, title, thumbnail, duration, type: 'free' | 'paid', price?: number, description, category: string, coachId?: string }`
    - Create `CalendarEvent` interface: `{ id, date: string, type: 'booking' | 'social' | 'personal', gymId?: string, gymName?: string, partnerName?: string, note?: string, isExpired: boolean, isReviewed: boolean }`
    - Create `VenueReview` interface: `{ id, gymId: string, authorName: string, date: string, environment: number, routeDesign: number, equipment: number, value: number, text?: string }`
    - Create `DailyTask` interface: `{ id, title: string, duration: string, type: 'free' | 'paid' | 'coach', courseId?: string, completed: boolean }`
    - Update `TabType` to `'gyms' | 'partners' | 'boost' | 'progress'`
    - Add `'courseDetail' | 'coachProfile'` to `ScreenType`
  - In `src/app/data/mockData.ts`:
    - Add `earnedDate` to existing BADGES entries (unlocked ones get dates like `"Mar 15, 2025"`, locked ones get no date)
    - Add `id` to existing `GYM_COACHES` entries
    - Add `videoUrl` and `fatigueLevel` to 2 of the existing SESSIONS entries
    - Create `COURSES` array: 3 free (Warm-Up Routine, Essential Stretching, Breathing Techniques) + 3 paid (Plateau Breaker: Core, Finger Strength Training, Advanced Footwork Drills)
    - Create `CALENDAR_EVENTS` array: 6 entries — 2 expired bookings (isExpired: true), 2 upcoming bookings, 1 social (synced partner climb), 1 personal note
    - Create `VENUE_REVIEWS` array: 4 reviews for 2 different gyms, with varied ratings
    - Create `DAILY_PLAN` array: 5 tasks mixing free course tasks and general training tasks
    - Create `COACH_COURSES` array: 2 courses linked to existing coaches via `coachId`

  **Must NOT do**:
  - Do not create more than 6 items per mock collection
  - Do not change existing interface shapes (only ADD fields)
  - Do not install any new dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure type definitions and data scaffolding, no complex logic
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: No UI work in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T2, T3, T4, T5)
  - **Blocks**: T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/types/index.ts` — ALL existing interfaces. Follow the exact naming/style conventions. Badge/SessionLog/Coach are the ones to extend.
  - `src/app/data/mockData.ts` — ALL existing mock data arrays (BADGES, SESSIONS, GYM_COACHES, GYMS_DATA). Follow the same `export const` pattern and naming convention (UPPER_SNAKE_CASE).

  **API/Type References**:
  - `src/app/types/index.ts:Badge` — Currently: `{ id, label, icon, unlocked, desc }`. Add `earnedDate?: string`.
  - `src/app/types/index.ts:SessionLog` — Currently: `{ date, routes, level, duration, heartRate, calories, notes }`. Add `videoUrl?: string`, `fatigueLevel?: number`.
  - `src/app/types/index.ts:Coach` — Currently: `{ name, rating, specialty }`. Add `id: string`.
  - `src/app/App.tsx:TabType` — Currently: `'gyms' | 'partners' | 'progress'`. Update to include `'boost'`.
  - `src/app/App.tsx:ScreenType` — Add `'courseDetail' | 'coachProfile'`.

  **Acceptance Criteria**:

  ```
  Scenario: TypeScript compiles with new types
    Tool: Bash
    Preconditions: Dev environment set up
    Steps:
      1. Run `npx tsc --noEmit`
      2. Verify exit code is 0
    Expected Result: Zero TypeScript errors
    Evidence: .sisyphus/evidence/task-1-tsc-check.txt

  Scenario: Mock data is well-formed
    Tool: Bash
    Preconditions: Types updated
    Steps:
      1. Run `npm run build`
      2. Verify exit code is 0
    Expected Result: Build succeeds, all mock data conforms to types
    Evidence: .sisyphus/evidence/task-1-build-check.txt

  Scenario: Mock data counts within limits
    Tool: Bash (grep)
    Preconditions: Mock data created
    Steps:
      1. Count items in each new array in mockData.ts
      2. Verify COURSES has exactly 6 items (3 free + 3 paid)
      3. Verify CALENDAR_EVENTS has exactly 6 items
      4. Verify VENUE_REVIEWS has exactly 4 items
      5. Verify DAILY_PLAN has exactly 5 items
      6. Verify COACH_COURSES has exactly 2 items
    Expected Result: All counts within ≤6 limit
    Evidence: .sisyphus/evidence/task-1-mock-counts.txt
  ```

  **Commit**: YES
  - Message: `feat(types): extend interfaces for all 10 features + scaffold mock data`
  - Files: `src/app/types/index.ts`, `src/app/data/mockData.ts`, `src/app/App.tsx` (TabType/ScreenType only)
  - Pre-commit: `npx tsc --noEmit`

- [x] 2. Create Shared Modal Component

  **What to do**:
  - Create `src/app/components/layout/Modal.tsx` as a shared, reusable modal component
  - **Positioning**: `fixed` overlay covering the full phone frame, with modal content area stopping ABOVE the bottom nav bar (96px bottom offset)
  - **Structure**: Full-screen backdrop (`bg-slate-900/60 backdrop-blur-sm`) + bottom-sheet container with `rounded-t-3xl` + scrollable content area
  - **Props**: `isOpen: boolean`, `onClose: () => void`, `title?: string`, `children: React.ReactNode`, `maxHeight?: string`
  - **Animation**: Use existing `animate-in slide-in-from-bottom-4` pattern
  - **Styling**: Must use `S.border` for the modal container top border, follow Neobrutalist design
  - **Key CSS**: The modal container must have `bottom: 96px` (or equivalent) so it sits above the bottom nav. The modal content area must have `overflow-y: auto` for scrollable content. The backdrop must handle click-to-close.
  - **z-index**: Modal must be above page content but below any system overlays. Use `z-50` for backdrop, `z-50` for content (they stack naturally).

  **Must NOT do**:
  - Do not create a generic component library — this is the ONLY shared component
  - Do not use any animation library — Tailwind classes only
  - Do not add any new dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file creation with clear spec
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T3, T4, T5)
  - **Blocks**: T6, T7, T9, T10, T11, T15
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/components/screens/journey/ProgressTab.tsx:249-280` — Current `Modal` function implementation. Copy the visual approach (backdrop blur, rounded top, slide-in animation) but fix positioning to be above bottom nav.
  - `src/app/components/screens/explore/GymDetailScreen.tsx:449+` — `Overlay` implementation using `absolute inset-0`. Shows the problem: uses absolute which scrolls with parent.
  - `src/app/components/screens/social/PartnersTab.tsx:801+` — `ReviewOverlay` implementation. Another inconsistent modal pattern to replace.

  **API/Type References**:
  - `src/app/components/layout/BottomNav.tsx` — Bottom nav height is `h-24` (96px). Modal must sit above this.

  **External References**:
  - `src/app/constants/styles.ts` — `S.border`, `S.shadow` constants to apply to modal container.

  **Acceptance Criteria**:

  ```
  Scenario: Modal renders fixed above bottom nav
    Tool: Playwright
    Preconditions: Dev server running, Modal integrated in a test page
    Steps:
      1. Navigate to a page that uses the Modal
      2. Trigger modal open
      3. Assert modal backdrop covers screen: `document.querySelector('[data-modal-backdrop]')`
      4. Assert modal container has `position: fixed`
      5. Assert modal container bottom edge is at or above 96px from viewport bottom
      6. Screenshot the modal state
    Expected Result: Modal visible, fixed position, content above bottom nav bar
    Evidence: .sisyphus/evidence/task-2-modal-position.png

  Scenario: Modal content scrolls independently
    Tool: Playwright
    Preconditions: Modal open with content taller than modal container
    Steps:
      1. Open modal with long content
      2. Scroll within the modal content area
      3. Verify page behind modal does NOT scroll
      4. Verify modal content scrolls independently
    Expected Result: Content scrollable, background locked
    Evidence: .sisyphus/evidence/task-2-modal-scroll.png

  Scenario: Modal closes on backdrop click
    Tool: Playwright
    Preconditions: Modal is open
    Steps:
      1. Click outside the modal content area (on backdrop)
      2. Assert modal is no longer in DOM or is hidden
    Expected Result: Modal closes
    Evidence: .sisyphus/evidence/task-2-modal-close.png
  ```

  **Commit**: YES
  - Message: `feat(ui): add shared Modal component with fixed positioning`
  - Files: `src/app/components/layout/Modal.tsx`
  - Pre-commit: `npm run build`

- [x] 3. Add Boost Tab to BottomNav + Cross-Tab Navigation

  **What to do**:
  - In `src/app/components/layout/BottomNav.tsx`:
    - Add 4th tab "Boost" with `Zap` icon (from lucide-react) at position 3 (order: Explore, Matches, Boost, Journey)
    - Adjust tab button widths to fit 4 tabs in 390px (change from `w-20` to `w-[88px]` or use `flex-1`)
    - Boost tab uses a teal-adjacent or amber color for active state (consistent with design)
  - In `src/app/App.tsx`:
    - Add `'boost'` to `TabType` union (if not done in T1)
    - Add `activeTab === 'boost'` rendering branch in the main tab switch
    - Create placeholder `BoostTab` component (empty frame with "Boost" title) at `src/app/components/screens/boost/BoostTab.tsx`
    - **Cross-tab navigation**: Extend the `navigate` function or add a `switchTab` callback that child components can call to change tabs. This is needed for: Journey AI promo → Boost, Tutorial → Boost. Pass `switchTab` as prop to tab components alongside `onNavigate`.

  **Must NOT do**:
  - Do not install React Router or any routing library
  - Do not implement full Boost tab content (just placeholder)
  - Do not change existing tab behavior or styling for Explore/Matches/Journey

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small navigation changes + placeholder component
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T4, T5)
  - **Blocks**: T9, T16
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/components/layout/BottomNav.tsx` — Current 3-tab implementation. Follow exact same pattern for 4th tab (icon + label + active state styling). Currently uses `w-20` per button with `justify-around`.
  - `src/app/App.tsx:35-70` — Tab rendering switch statement. Add `'boost'` branch following same pattern as `'progress'`.

  **API/Type References**:
  - `src/app/App.tsx:TabType` — Union type to extend with `'boost'`
  - `lucide-react` — Import `Zap` icon for the Boost tab

  **Acceptance Criteria**:

  ```
  Scenario: 4 tabs render without truncation
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to app root
      2. Screenshot bottom nav bar
      3. Assert 4 tab buttons exist: `document.querySelectorAll('[data-tab]').length === 4`
      4. Assert labels visible: "Explore", "Matches", "Boost", "Journey"
      5. Verify no text truncation at 390px viewport width
    Expected Result: All 4 tabs visible with full labels
    Evidence: .sisyphus/evidence/task-3-four-tabs.png

  Scenario: Boost tab navigable
    Tool: Playwright
    Preconditions: App loaded
    Steps:
      1. Click "Boost" tab
      2. Assert Boost placeholder content is visible
      3. Click "Journey" tab, verify Journey page loads
      4. Click "Boost" tab again, verify Boost loads
    Expected Result: Tab switching works for all 4 tabs
    Evidence: .sisyphus/evidence/task-3-tab-switch.png

  Scenario: Cross-tab function exists
    Tool: Bash (grep)
    Preconditions: Code updated
    Steps:
      1. Search for `switchTab` or equivalent function in App.tsx
      2. Verify it's passed as prop to BoostTab and ProgressTab
    Expected Result: Cross-tab navigation mechanism implemented
    Evidence: .sisyphus/evidence/task-3-cross-tab.txt
  ```

  **Commit**: YES
  - Message: `feat(nav): add Boost tab to BottomNav + cross-tab navigation`
  - Files: `src/app/components/layout/BottomNav.tsx`, `src/app/App.tsx`, `src/app/components/screens/boost/BoostTab.tsx`
  - Pre-commit: `npm run build`

- [x] 4. Split ProgressTab into Sub-Components

  **What to do**:
  - Refactor `src/app/components/screens/journey/ProgressTab.tsx` (311 lines) into focused sub-components:
    - `src/app/components/screens/journey/ProfileCard.tsx` — User profile header (avatar, name, level, progress bar, stats grid: Routes/Sessions/Calories)
    - `src/app/components/screens/journey/BadgeGrid.tsx` — Badge grid display + badge detail logic (receives badges array, handles badge selection/modal)
    - `src/app/components/screens/journey/SessionHistory.tsx` — Recent sessions list + LogSessionModal (receives sessions array + add callback)
    - `src/app/components/screens/journey/HealthStats.tsx` — Live heart rate/duration/calories display (the animated stats section)
    - `src/app/components/screens/journey/AICoachCard.tsx` — The AI Coach promotional card (will be modified in T14 to link to Boost)
  - ProgressTab.tsx becomes a thin orchestrator that imports and renders these sub-components in order
  - **DO NOT remove the local `Modal` function yet** — T11 handles migration to shared Modal. Keep the local Modal working for now.
  - Maintain ALL existing functionality — this is a pure refactor, zero behavior change

  **Must NOT do**:
  - Do not change ANY visual appearance or behavior
  - Do not modify the Modal implementation (T11 handles that)
  - Do not add new features to any sub-component
  - Do not change prop interfaces — sub-components receive what they need from ProgressTab

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure extraction refactor, no new logic
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T3, T5)
  - **Blocks**: T6, T7, T8, T11, T14
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/components/screens/journey/ProgressTab.tsx` — The ENTIRE file. Read it completely. Lines ~1-50: imports/state, ~51-96: profile section, ~97-119: badge grid, ~120-146: health stats, ~148-163: AI coach card, ~165-210: session history, ~211-248: log session modal, ~249-280: Modal component.

  **API/Type References**:
  - `src/app/types/index.ts:Badge` — Used by BadgeGrid
  - `src/app/types/index.ts:SessionLog` — Used by SessionHistory
  - `src/app/constants/styles.ts` — `S` constants used throughout

  **Acceptance Criteria**:

  ```
  Scenario: Visual regression check — Journey page unchanged
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to Journey tab
      2. Screenshot full page
      3. Compare visually with pre-refactor state (if available) or verify all sections present:
         - Profile card with avatar, name, level bar
         - Stats grid (Routes, Sessions, Calories)
         - Badge grid with icons
         - Health stats (heart rate, duration, calories)
         - AI Coach card
         - Recent Sessions list
      4. Click a badge — verify modal opens with description
      5. Click "Log Session" — verify modal opens with form
    Expected Result: Identical appearance and behavior to before refactor
    Evidence: .sisyphus/evidence/task-4-journey-visual.png

  Scenario: Build passes after refactor
    Tool: Bash
    Steps:
      1. Run `npx tsc --noEmit`
      2. Run `npm run build`
    Expected Result: Both pass with zero errors
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(journey): split ProgressTab into sub-components`
  - Files: `src/app/components/screens/journey/ProgressTab.tsx`, `ProfileCard.tsx`, `BadgeGrid.tsx`, `SessionHistory.tsx`, `HealthStats.tsx`, `AICoachCard.tsx`
  - Pre-commit: `npm run build`

- [ ] 5. Lift Shared State to App.tsx

  **What to do**:
  - In `src/app/App.tsx`, lift these state items from child components to the top level:
    - `sessions: SessionLog[]` — currently hardcoded `SESSIONS` in ProgressTab. Move to `useState` in App.tsx, initialized from mock data. Pass down as prop + `addSession` callback.
    - `calendarEvents: CalendarEvent[]` — new state, initialized from `CALENDAR_EVENTS` mock data
    - `venueReviews: VenueReview[]` — new state, initialized from `VENUE_REVIEWS` mock data
    - `purchasedCourseIds: string[]` — new state, initialized as `[]` (empty — nothing purchased yet by default)
  - Pass these states as props to `ProgressTab` (sessions, calendarEvents), `BoostTab` (purchasedCourseIds, sessions), and `GymDetailScreen` (venueReviews)
  - When `addSession` is called from the session log modal, it prepends the new session to the array so it appears at the top of history
  - **Important**: The `SESSIONS` import in ProgressTab must be replaced with the prop. Initial value in App.tsx comes from `SESSIONS` import.

  **Must NOT do**:
  - Do not install Zustand, Redux, or any state management library
  - Do not use React Context (keep it simple with prop drilling — prototype scope)
  - Do not change visual appearance of any component

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: State lifting is a well-defined refactor pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T3, T4)
  - **Blocks**: T7, T8, T15
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/App.tsx:20-80` — Current state management pattern. Uses `useState` for `activeTab`, `activeScreen`, `screenData`. Follow same pattern.
  - `src/app/components/screens/journey/ProgressTab.tsx:7-11` — Current hardcoded `SESSIONS` usage. This must be replaced with prop.

  **API/Type References**:
  - `src/app/types/index.ts:SessionLog` — Type for sessions array
  - `src/app/data/mockData.ts:SESSIONS` — Initial data for sessions state
  - New types from T1: `CalendarEvent`, `VenueReview`
  - New mock data from T1: `CALENDAR_EVENTS`, `VENUE_REVIEWS`

  **Acceptance Criteria**:

  ```
  Scenario: Sessions persist after logging
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to Journey tab
      2. Count existing sessions in "Recent Sessions" list
      3. Click "Log Session", fill form (routes: 5, level: V2, duration: 60)
      4. Submit the session
      5. Verify new session appears at top of "Recent Sessions"
      6. Navigate to Explore tab, then back to Journey
      7. Verify the new session is still visible
    Expected Result: Session persists across tab switches
    Evidence: .sisyphus/evidence/task-5-session-persist.png

  Scenario: Build passes with lifted state
    Tool: Bash
    Steps:
      1. Run `npx tsc --noEmit`
      2. Run `npm run build`
    Expected Result: Both pass with zero errors
    Evidence: .sisyphus/evidence/task-5-build.txt
  ```

  **Commit**: YES
  - Message: `refactor(state): lift sessions/calendar/reviews state to App.tsx`
  - Files: `src/app/App.tsx`, `src/app/components/screens/journey/ProgressTab.tsx`
  - Pre-commit: `npm run build`

- [ ] 6. Badge Timestamps in Detail Modal

  **What to do**:
  - In `BadgeGrid.tsx` (extracted in T4), update the badge detail modal to show the earned date
  - For **unlocked** badges: display `"Earned {earnedDate}"` (e.g., "Earned Mar 15, 2025") below the badge description, in `text-slate-500 text-sm`
  - For **locked** badges: display `"Not yet earned"` in `text-slate-400 text-sm italic`
  - Use the shared Modal component from T2 for the badge detail view (replacing the local modal)
  - Maintain badge icon, label, and description display

  **Must NOT do**:
  - Do not change badge grid layout or locked/unlocked visual treatment
  - Do not add date picker or edit functionality

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small UI update — add one text line to existing modal
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7, T8, T9, T10, T11)
  - **Blocks**: None
  - **Blocked By**: T1, T2, T4

  **References**:

  **Pattern References**:
  - `src/app/components/screens/journey/BadgeGrid.tsx` (from T4) — Badge grid and current detail modal
  - `src/app/components/layout/Modal.tsx` (from T2) — Shared modal to use

  **API/Type References**:
  - `src/app/types/index.ts:Badge` — Now includes `earnedDate?: string`
  - `src/app/data/mockData.ts:BADGES` — Now includes `earnedDate` on unlocked badges

  **Acceptance Criteria**:

  ```
  Scenario: Unlocked badge shows earned date
    Tool: Playwright
    Preconditions: Dev server running, Journey tab active
    Steps:
      1. Navigate to Journey tab
      2. Click on an unlocked badge (e.g., "First Climb")
      3. Assert modal opens with badge icon, label, description
      4. Assert text containing "Earned" and a date is visible
      5. Screenshot the modal
    Expected Result: Modal shows "Earned Mar 15, 2025" (or similar date from mock data)
    Evidence: .sisyphus/evidence/task-6-badge-unlocked.png

  Scenario: Locked badge shows "Not yet earned"
    Tool: Playwright
    Preconditions: Journey tab active
    Steps:
      1. Click on a locked/greyed-out badge
      2. Assert modal shows badge info
      3. Assert text "Not yet earned" is visible in italic style
    Expected Result: Locked badge modal shows placeholder text
    Evidence: .sisyphus/evidence/task-6-badge-locked.png
  ```

  **Commit**: YES
  - Message: `feat(badges): add earned timestamps to badge detail modal`
  - Files: `src/app/components/screens/journey/BadgeGrid.tsx`
  - Pre-commit: `npm run build`

- [ ] 7. Session Enhancement — Form Fields + History Display + Video

  **What to do**:
  - In `SessionHistory.tsx` (from T4), enhance the `LogSessionModal`:
    - Add **Video Upload** section: A button "Attach Video" that simulates upload (shows progress bar → completes → shows thumbnail placeholder with play icon). Store `videoUrl` as a mock string.
    - Add **Smartwatch Data** section: Three display fields — Heart Rate (BPM number), Calories (kcal number), Fatigue Level (progress bar + text label). These are INPUT fields that user fills in (or mock auto-populated).
    - **Fatigue Level**: Slider or segmented control (1-10). Display as colored progress bar (green 1-3 "Low", yellow 4-6 "Moderate", orange 7-8 "High", red 9-10 "Extreme") + text label.
  - In `SessionHistory.tsx`, update the session history list:
    - Sessions with `videoUrl` show a small play icon/badge on the session card
    - Clicking a session card opens a **Session Detail Modal** (using shared Modal from T2):
      - Shows all session data: date, routes, level, duration, heart rate, calories, fatigue
      - If `videoUrl` exists: shows a thumbnail with play overlay (no actual playback — just a static image with a play button)
    - Sessions WITHOUT video show no play icon, detail modal shows data without video section
  - **Critical**: When a new session is logged via the modal, call `addSession` (from T5 lifted state) to prepend it to the sessions array. The new session must appear immediately in the history list.
  - Use the shared Modal component (T2) for both LogSessionModal and SessionDetailModal

  **Must NOT do**:
  - Do not implement actual video upload or playback (thumbnail + play icon only)
  - Do not use `<video>` HTML element
  - Do not add file input — simulate with a button press + progress animation
  - Do not remove existing fields (routes, level, duration)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple UI elements, form enhancement, modal interactions — moderate complexity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T8, T9, T10, T11)
  - **Blocks**: None
  - **Blocked By**: T1, T2, T4, T5

  **References**:

  **Pattern References**:
  - `src/app/components/screens/journey/SessionHistory.tsx` (from T4) — Current session list and LogSessionModal
  - `src/app/components/screens/journey/ProgressTab.tsx:211-248` (original) — LogSessionModal form pattern with input fields
  - `src/app/components/screens/journey/ProgressTab.tsx:165-210` (original) — AI upload progress bar simulation pattern. Reuse this for video upload simulation.
  - `src/app/components/layout/Modal.tsx` (from T2) — Shared modal for all new modals

  **API/Type References**:
  - `src/app/types/index.ts:SessionLog` — Now includes `videoUrl?: string`, `fatigueLevel?: number`
  - Existing `SessionLog` fields: `heartRate`, `calories` already exist — make them editable inputs in the form

  **External References**:
  - `src/app/constants/styles.ts` — `S.input` for form fields, `S.border`/`S.shadow` for cards

  **Acceptance Criteria**:

  ```
  Scenario: Log session with video and smartwatch data
    Tool: Playwright
    Preconditions: Dev server running, Journey tab
    Steps:
      1. Click "Log Session" button
      2. Fill routes: 8, level: V3, duration: 90
      3. Click "Attach Video" button
      4. Wait for simulated upload progress to complete
      5. Verify thumbnail appears with play icon
      6. Fill heart rate: 145, calories: 320, fatigue: 7
      7. Verify fatigue bar shows orange "High" state
      8. Submit session
      9. Verify new session appears at top of history list
      10. Verify session card shows small play/video icon
    Expected Result: Full session with video and smartwatch data recorded and visible
    Evidence: .sisyphus/evidence/task-7-log-session.png

  Scenario: View session detail with video thumbnail
    Tool: Playwright
    Preconditions: A session with videoUrl exists in history
    Steps:
      1. Click on a session card that has a video icon
      2. Assert detail modal opens
      3. Verify video thumbnail with play overlay is visible
      4. Verify heart rate, calories, fatigue data displayed
      5. Screenshot the detail modal
    Expected Result: Session detail shows all data including video thumbnail
    Evidence: .sisyphus/evidence/task-7-session-detail.png

  Scenario: Session without video displays correctly
    Tool: Playwright
    Steps:
      1. Click on a session card WITHOUT video icon
      2. Assert detail modal opens without video section
      3. Verify other data (routes, level, duration) still displayed
    Expected Result: No video section, other data intact
    Evidence: .sisyphus/evidence/task-7-no-video-session.png
  ```

  **Commit**: YES
  - Message: `feat(sessions): enhance recording with video + smartwatch data`
  - Files: `src/app/components/screens/journey/SessionHistory.tsx`
  - Pre-commit: `npm run build`

- [ ] 8. Journey Calendar — Monthly View + Daily Schedule

  **What to do**:
  - Create `src/app/components/screens/journey/CalendarSection.tsx`
  - **Position**: In ProgressTab, render CalendarSection ABOVE BadgeGrid (below HealthStats/profile, above badges)
  - **Monthly View**:
    - Display current month as a grid (Sun-Sat columns, date cells)
    - Month/year header with left/right arrow buttons to navigate months
    - Dates with events get colored dots: booking=teal, social=orange, personal=slate
    - Today's date gets a ring/highlight
  - **Daily Schedule List**:
    - Below the calendar grid, show events for the selected date
    - Each event card shows: type icon, gym name or partner name, time/note
    - **Expired bookings** (isExpired: true, isReviewed: false) show a "Write Review" button — this is the ENTRY POINT for venue reviews (T15 will implement the form)
    - **Expired & reviewed** bookings show a "Reviewed ✓" badge
    - Tapping a date with no events shows "No climbs planned" empty state
  - **Sync indicator**: Social events from Matches show a small "synced" badge/icon to indicate they came from partner matching
  - Calendar receives `calendarEvents` prop from App.tsx (via T5)
  - Use Neobrutalist styling: calendar cells with `S.border` on hover, event cards with `S.border + S.shadow`

  **Must NOT do**:
  - Do not implement actual date comparison — expired bookings are pre-flagged in mock data (`isExpired: true`)
  - Do not implement the review form itself (T15 handles that) — just render the "Write Review" button
  - Do not install any calendar library — build from scratch with CSS grid
  - Do not implement month navigation with actual Date logic beyond simple month ±1

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex UI layout (calendar grid, responsive cells, event indicators, daily list)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Calendar grid requires precise layout and visual design decisions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T9, T10, T11)
  - **Blocks**: T15
  - **Blocked By**: T1, T4, T5

  **References**:

  **Pattern References**:
  - `src/app/components/screens/social/ChatScreen.tsx` — Has a 7-day horizontal date scroller. Reference the date cell styling pattern and day-of-week labels, but build a full month grid instead.
  - `src/app/components/screens/journey/ProgressTab.tsx:97-119` (original) — Badge grid uses a `grid grid-cols-4 gap-3` pattern. Calendar can use `grid grid-cols-7 gap-1` for similar consistency.

  **API/Type References**:
  - `src/app/types/index.ts:CalendarEvent` — `{ id, date, type, gymId?, gymName?, partnerName?, note?, isExpired, isReviewed }`
  - `src/app/data/mockData.ts:CALENDAR_EVENTS` — 6 events across different dates

  **External References**:
  - `src/app/constants/styles.ts` — S.border, S.shadow, S.press for interactive elements

  **Acceptance Criteria**:

  ```
  Scenario: Monthly calendar renders with event dots
    Tool: Playwright
    Preconditions: Dev server running, Journey tab
    Steps:
      1. Navigate to Journey tab
      2. Scroll to Calendar section (above badges)
      3. Assert month/year header is visible (e.g., "April 2025")
      4. Assert 7-column grid with day labels (S M T W T F S)
      5. Assert dates with events show colored dots
      6. Screenshot the calendar
    Expected Result: Full month grid with colored event indicators
    Evidence: .sisyphus/evidence/task-8-calendar-month.png

  Scenario: Tap date shows daily schedule
    Tool: Playwright
    Steps:
      1. Click on a date that has an event (colored dot)
      2. Verify daily schedule list appears below calendar
      3. Verify event card shows type icon, gym/partner name
      4. If expired booking: verify "Write Review" button visible
    Expected Result: Daily schedule with event details
    Evidence: .sisyphus/evidence/task-8-daily-schedule.png

  Scenario: Empty date shows placeholder
    Tool: Playwright
    Steps:
      1. Click on a date with no events
      2. Verify "No climbs planned" text appears
    Expected Result: Empty state message
    Evidence: .sisyphus/evidence/task-8-empty-date.png
  ```

  **Commit**: YES
  - Message: `feat(calendar): add monthly calendar view to Journey page`
  - Files: `src/app/components/screens/journey/CalendarSection.tsx`, `src/app/components/screens/journey/ProgressTab.tsx`
  - Pre-commit: `npm run build`

- [ ] 9. Boost Tab — Scaffold + Free/Paid Course Sections

  **What to do**:
  - Build out `src/app/components/screens/boost/BoostTab.tsx` (replacing T3's placeholder):
    - **Header**: "Boost" title in `text-3xl font-black` (matching other tabs' headers)
    - **Free Courses Section**: "Free Training" heading + horizontal scrollable card row. Each card: thumbnail placeholder (colored frame with category icon), title, duration badge. Tappable → opens CourseDetailScreen.
    - **Paid Courses Section**: "Premium Training" heading + vertical list of course cards. Each card: thumbnail, title, price tag ("$9.99"), duration, lock icon if not purchased. Tappable → opens CourseDetailScreen with purchase CTA.
    - **Empty AI Plan placeholder**: A card at the top reading "Your Daily Training Plan" with "Coming soon" or placeholder — T12 will fill this in. Reserve the space.
    - **Empty Coach placeholder**: Section below courses reading "Train with a Coach" — T13 will fill this in. Reserve the space.
  - Create `src/app/components/screens/boost/CourseDetailScreen.tsx`:
    - Shows course thumbnail (large), title, description, duration
    - If free: "Start Course" button (simulates starting — just shows a confirmation toast/modal)
    - If paid & not purchased: "Purchase for $X" button (simulates purchase — toggles to "Start Course")
    - If paid & purchased: "Start Course" button
    - Video area: Large thumbnail with play overlay (no actual video)
    - "Back" button returns to Boost tab
  - Register `'courseDetail'` screen type in App.tsx navigation
  - CourseDetailScreen receives `courseId` via `screenData` and looks up from `COURSES` + `COACH_COURSES`

  **Must NOT do**:
  - Do not implement AI Plan section content (T12)
  - Do not implement Coach section content (T13)
  - Do not implement actual payment — just toggle `purchasedCourseIds` state
  - Do not use `<video>` elements — thumbnails only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multiple layouts, scrollable sections, course cards, detail screen — visual-heavy
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Course card design, layout decisions for sections

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T8, T10, T11)
  - **Blocks**: T12, T13, T14, T16
  - **Blocked By**: T1, T2, T3

  **References**:

  **Pattern References**:
  - `src/app/components/screens/explore/GymsTab.tsx` — Gym card list with search/filter. Follow the card pattern for course cards (thumbnail area + info below).
  - `src/app/components/screens/explore/GymDetailScreen.tsx` — Detail screen pattern with back button, large header, tabbed content. Reference for CourseDetailScreen layout.
  - `src/app/components/screens/social/PartnersTab.tsx:304-486` — `PlanSheet` with "Pay" button simulation. Reference for purchase flow pattern.

  **API/Type References**:
  - `src/app/types/index.ts:Course` — `{ id, title, thumbnail, duration, type, price?, description, category, coachId? }`
  - `src/app/data/mockData.ts:COURSES` — 3 free + 3 paid courses
  - `src/app/data/mockData.ts:COACH_COURSES` — 2 coach-linked courses
  - `src/app/App.tsx:purchasedCourseIds` — State for tracking purchases

  **External References**:
  - `src/app/constants/styles.ts` — All Neobrutalist constants

  **Acceptance Criteria**:

  ```
  Scenario: Boost tab shows free and paid course sections
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Click "Boost" tab
      2. Assert "Free Training" section heading visible
      3. Assert 3 free course cards visible (horizontal scroll)
      4. Assert "Premium Training" section heading visible
      5. Assert 3+ paid course cards visible with price tags
      6. Screenshot the full Boost tab
    Expected Result: Both sections render with correct course counts
    Evidence: .sisyphus/evidence/task-9-boost-courses.png

  Scenario: Course detail screen opens and shows purchase flow
    Tool: Playwright
    Steps:
      1. Click on a paid course card
      2. Assert CourseDetailScreen loads with course title, description, price
      3. Assert "Purchase for $X" button visible
      4. Click purchase button
      5. Assert button changes to "Start Course"
      6. Click back, verify return to Boost tab
    Expected Result: Full purchase simulation flow works
    Evidence: .sisyphus/evidence/task-9-course-detail.png

  Scenario: Free course detail has no purchase step
    Tool: Playwright
    Steps:
      1. Click on a free course card
      2. Assert CourseDetailScreen shows "Start Course" button directly (no price)
    Expected Result: Free course skips purchase step
    Evidence: .sisyphus/evidence/task-9-free-course.png
  ```

  **Commit**: YES
  - Message: `feat(boost): scaffold Boost tab with free/paid course sections`
  - Files: `src/app/components/screens/boost/BoostTab.tsx`, `src/app/components/screens/boost/CourseDetailScreen.tsx`, `src/app/App.tsx`
  - Pre-commit: `npm run build`

- [ ] 10. Gym Detail — Review Display Section (Read-Only)

  **What to do**:
  - In `src/app/components/screens/explore/GymDetailScreen.tsx`, add a "Reviews" section:
    - Add a new tab or section below existing content (Routes, Coaches tabs already exist — add "Reviews" as a 3rd tab)
    - Display reviews from `VENUE_REVIEWS` filtered by `gymId`
    - Each review card shows: author name, date, 4 dimension scores (Environment, Route Design, Equipment, Value) as star/number ratings, optional text comment
    - Overall average score calculated from all reviews and shown at top of section
    - Individual dimension averages also shown (e.g., "Environment: 4.2 ★")
    - If no reviews for this gym: show "No reviews yet" empty state
  - GymDetailScreen receives `venueReviews` prop from App.tsx (via T5 state)
  - Use Neobrutalist styling: review cards with `S.border + S.shadow`, dimension scores in a compact grid

  **Must NOT do**:
  - Do not add "Write Review" button here (that's in Calendar via T15)
  - Do not allow editing or deleting reviews
  - Do not change existing Routes or Coaches tabs

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Add a read-only list section to existing screen — straightforward
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T8, T9, T11)
  - **Blocks**: T15
  - **Blocked By**: T1, T2

  **References**:

  **Pattern References**:
  - `src/app/components/screens/explore/GymDetailScreen.tsx` — Existing tab system (Routes, Coaches). Add "Reviews" tab following same pattern.
  - `src/app/components/screens/social/PartnersTab.tsx:711-799` — `ReviewSheet` with star rating rows. Reference for how to display ratings per dimension.
  - `src/app/data/mockData.ts:PARTNER_RATINGS` — Rating dimension pattern to follow for venue review dimensions.

  **API/Type References**:
  - `src/app/types/index.ts:VenueReview` — `{ id, gymId, authorName, date, environment, routeDesign, equipment, value, text? }`
  - `src/app/data/mockData.ts:VENUE_REVIEWS` — 4 reviews across 2 gyms

  **Acceptance Criteria**:

  ```
  Scenario: Reviews tab shows venue reviews
    Tool: Playwright
    Preconditions: Dev server, navigate to a gym with reviews
    Steps:
      1. Navigate to Explore tab
      2. Click on a gym card
      3. Find and click "Reviews" tab
      4. Assert review cards are visible
      5. Assert each card shows author name, date, 4 dimension scores
      6. Assert overall average score shown at top
    Expected Result: Reviews display with dimension ratings
    Evidence: .sisyphus/evidence/task-10-gym-reviews.png

  Scenario: Gym with no reviews shows empty state
    Tool: Playwright
    Steps:
      1. Navigate to a gym that has no reviews in mock data
      2. Click "Reviews" tab
      3. Assert "No reviews yet" message visible
    Expected Result: Empty state handled gracefully
    Evidence: .sisyphus/evidence/task-10-no-reviews.png
  ```

  **Commit**: YES
  - Message: `feat(gym): add read-only review display to gym detail`
  - Files: `src/app/components/screens/explore/GymDetailScreen.tsx`
  - Pre-commit: `npm run build`

- [ ] 11. Migrate Existing Modals to Shared Modal Component

  **What to do**:
  - Replace ALL locally-defined modal/overlay components with the shared `Modal` from T2:
    - `ProgressTab.tsx` / sub-components — Remove local `Modal` function, import shared Modal
    - `GymDetailScreen.tsx` — Replace `Overlay` function with shared Modal
    - `PartnersTab.tsx` — Replace `ReviewOverlay` with shared Modal
    - `ChatScreen.tsx` — Replace any local overlay/sheet with shared Modal (if applicable)
  - For each replacement:
    - Match the existing content layout inside the new Modal wrapper
    - Ensure all `onClose` handlers still work
    - Ensure modal titles are preserved
    - Verify the fixed positioning works correctly (content above bottom nav)
  - After migration, delete ALL local modal/overlay function definitions
  - This task ensures requirement #10 ("all modals fixed above bottom nav") is met across the ENTIRE app

  **Must NOT do**:
  - Do not change modal CONTENT — only the wrapper/container
  - Do not add new modals — only migrate existing ones
  - Do not change the shared Modal API (if content doesn't fit, adjust content, not Modal)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pattern replacement across files — mechanical refactor
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T8, T9, T10)
  - **Blocks**: None
  - **Blocked By**: T2, T4

  **References**:

  **Pattern References**:
  - `src/app/components/layout/Modal.tsx` (from T2) — The shared component to use everywhere
  - `src/app/components/screens/journey/ProgressTab.tsx:249-280` — Local `Modal` to remove
  - `src/app/components/screens/explore/GymDetailScreen.tsx:449+` — `Overlay` to replace
  - `src/app/components/screens/social/PartnersTab.tsx:801+` — `ReviewOverlay` to replace

  **Acceptance Criteria**:

  ```
  Scenario: All modals use consistent fixed positioning
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Journey tab → Click badge → Verify modal fixed above bottom nav
      2. Journey tab → Click "Log Session" → Verify modal fixed above bottom nav
      3. Explore tab → Gym detail → Trigger booking modal → Verify fixed
      4. Matches tab → Trigger review overlay → Verify fixed
      5. For each: scroll page behind modal, verify modal stays fixed
    Expected Result: ALL modals are fixed above bottom nav, page doesn't scroll behind
    Evidence: .sisyphus/evidence/task-11-modals-journey.png, task-11-modals-explore.png, task-11-modals-matches.png

  Scenario: No local modal definitions remain
    Tool: Bash (grep)
    Steps:
      1. Search for `function Modal` in ProgressTab.tsx → should NOT exist
      2. Search for `function Overlay` in GymDetailScreen.tsx → should NOT exist
      3. Search for `function ReviewOverlay` in PartnersTab.tsx → should NOT exist
      4. Search for imports from `../layout/Modal` → should exist in all files that use modals
    Expected Result: Zero local modal definitions, all import shared Modal
    Evidence: .sisyphus/evidence/task-11-no-local-modals.txt
  ```

  **Commit**: YES
  - Message: `refactor(modals): migrate all existing modals to shared Modal component`
  - Files: `ProgressTab.tsx` (or sub-components), `GymDetailScreen.tsx`, `PartnersTab.tsx`, `ChatScreen.tsx`
  - Pre-commit: `npm run build`

- [ ] 12. Boost Tab — AI Daily Training Plan Section

  **What to do**:
  - In `BoostTab.tsx`, replace the AI Plan placeholder with a functional section:
    - **Section Header**: "Today's Training Plan" with a sparkle/star icon
    - **Task Cards**: Render `DAILY_PLAN` mock data as a vertical list of task cards
    - Each task card shows: checkbox (toggle completed), task title, duration, type badge (free/paid/coach)
    - Free tasks: tappable → navigates to the course detail (CourseDetailScreen)
    - Paid tasks (not purchased): show lock icon + "Unlock" badge → navigates to course detail with purchase CTA
    - Coach tasks: show coach avatar/name badge → navigates to course detail
    - Completed tasks show strikethrough title + green check
    - **Progress indicator**: "3/5 completed" progress bar at the top of the section
  - The plan is HARDCODED (from `DAILY_PLAN` mock data) — no AI generation logic

  **Must NOT do**:
  - Do not implement AI recommendation algorithm
  - Do not make the plan dynamic based on user data
  - Do not implement actual course video playback

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Task card design, progress indicator, interactive checkboxes — visual component work
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T13, T14, T15, T16)
  - **Blocks**: None
  - **Blocked By**: T1, T9

  **References**:

  **Pattern References**:
  - `src/app/components/screens/boost/BoostTab.tsx` (from T9) — Existing layout to add section into
  - `src/app/components/screens/journey/ProgressTab.tsx:51-65` (original) — Progress bar pattern for level progression. Reuse for "3/5 completed" bar.

  **API/Type References**:
  - `src/app/types/index.ts:DailyTask` — `{ id, title, duration, type, courseId?, completed }`
  - `src/app/data/mockData.ts:DAILY_PLAN` — 5 daily tasks

  **Acceptance Criteria**:

  ```
  Scenario: Daily plan shows task cards with progress
    Tool: Playwright
    Preconditions: Dev server, Boost tab
    Steps:
      1. Navigate to Boost tab
      2. Assert "Today's Training Plan" heading visible
      3. Assert progress bar shows "X/5 completed"
      4. Assert 5 task cards visible with title, duration, type badge
      5. Click checkbox on a task → verify strikethrough + progress update
    Expected Result: Interactive daily plan with progress tracking
    Evidence: .sisyphus/evidence/task-12-daily-plan.png

  Scenario: Task card navigates to course detail
    Tool: Playwright
    Steps:
      1. Click on a free task card (not the checkbox)
      2. Verify CourseDetailScreen opens for the linked course
      3. Navigate back to Boost tab
    Expected Result: Task → Course navigation works
    Evidence: .sisyphus/evidence/task-12-task-to-course.png
  ```

  **Commit**: YES
  - Message: `feat(boost): add AI daily training plan section`
  - Files: `src/app/components/screens/boost/BoostTab.tsx`
  - Pre-commit: `npm run build`

- [ ] 13. Boost Tab — Coach Section + Course Integration

  **What to do**:
  - In `BoostTab.tsx`, replace the Coach placeholder with a functional section:
    - **Section Header**: "Train with a Coach" with a Users icon
    - **Coach Cards**: Horizontal scrollable row of coach cards (from `GYM_COACHES` mock data, now with `id`)
    - Each coach card: avatar placeholder (colored circle with initials), name, specialty, rating
    - Below coach cards: "Coach Courses" sub-section showing `COACH_COURSES` filtered by coach
    - Coach course cards: similar to regular course cards but with coach name badge
    - Tapping a coach course → CourseDetailScreen (same as T9)
    - Tapping a coach card → could show a coach profile or just filter their courses (keep simple: just filter courses below)
  - **Integration with AI Plan**: If a coach course has `courseId` that matches a `DailyTask`, the task card (from T12) should show a coach badge. This is a display-only change based on data matching.

  **Must NOT do**:
  - Do not create a separate CoachProfileScreen (keep it simple — coach cards expand to show their courses inline)
  - Do not implement coach booking flow (that stays in GymDetailScreen)
  - Do not remove coaches from GymDetailScreen (both locations keep coaches per user confirmation)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Coach card design, horizontal scrolling, course filtering
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T12, T14, T15, T16)
  - **Blocks**: None
  - **Blocked By**: T1, T9

  **References**:

  **Pattern References**:
  - `src/app/components/screens/explore/GymDetailScreen.tsx` — Existing coach listing pattern in Coaches tab. Reference card layout.
  - `src/app/components/screens/boost/BoostTab.tsx` (from T9) — Free courses horizontal scroll pattern. Reuse for coach cards.

  **API/Type References**:
  - `src/app/types/index.ts:Coach` — Now includes `id: string`
  - `src/app/data/mockData.ts:GYM_COACHES` — Existing coaches with new `id`
  - `src/app/data/mockData.ts:COACH_COURSES` — 2 courses linked via `coachId`

  **Acceptance Criteria**:

  ```
  Scenario: Coach section shows coaches and their courses
    Tool: Playwright
    Preconditions: Dev server, Boost tab
    Steps:
      1. Navigate to Boost tab, scroll to "Train with a Coach" section
      2. Assert coach cards visible in horizontal scroll
      3. Assert coach name, specialty, rating visible on cards
      4. Assert "Coach Courses" sub-section visible below
      5. Assert coach course cards show coach name badge
    Expected Result: Coach section with cards and linked courses
    Evidence: .sisyphus/evidence/task-13-coach-section.png

  Scenario: Coach course navigates to detail
    Tool: Playwright
    Steps:
      1. Click on a coach course card
      2. Verify CourseDetailScreen opens
      3. Verify course shows coach attribution
    Expected Result: Coach course → detail navigation works
    Evidence: .sisyphus/evidence/task-13-coach-course-detail.png
  ```

  **Commit**: YES
  - Message: `feat(boost): add coach section with publishable courses`
  - Files: `src/app/components/screens/boost/BoostTab.tsx`
  - Pre-commit: `npm run build`

- [ ] 14. Move AI Analysis from Journey to Boost + Update Promo Card

  **What to do**:
  - In `AICoachCard.tsx` (from T4), transform the card from a video upload trigger to a **promotional link card**:
    - Keep the indigo/purple gradient styling
    - Change text to promote the AI training plan (e.g., "Your AI Training Plan is Ready", "See today's personalized training tasks")
    - Remove the "Upload Route Video" button and video upload modal
    - Add a CTA button "View Plan →" that calls `switchTab('boost')` (from T3's cross-tab mechanism)
  - In `BoostTab.tsx`, add an **AI Analysis section** (between the daily plan and courses):
    - "AI Technique Analysis" heading
    - Brief description: "Upload your climbing video for professional technique feedback"
    - "Upload Video" button that triggers the simulated video upload flow (reuse the progress bar + feedback pattern from the original ProgressTab AI section)
    - After "upload completes": show hardcoded technique feedback cards (Footwork: 7/10, Body Position: 6/10, Next Focus: "Hip rotation on overhangs")
    - This is the SAME feature that was on Journey — just relocated to Boost tab
  - The video analysis in Boost should use shared Modal (T2) for any overlays

  **Must NOT do**:
  - Do not keep video upload functionality in Journey — it moves entirely to Boost
  - Do not implement actual AI analysis — feedback is hardcoded
  - Do not change the HealthStats component (live heart rate stays in Journey)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Moving feature between tabs, updating two components, maintaining consistency
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T12, T13, T15, T16)
  - **Blocks**: T16
  - **Blocked By**: T4, T9

  **References**:

  **Pattern References**:
  - `src/app/components/screens/journey/AICoachCard.tsx` (from T4) — Current AI coach card to modify
  - `src/app/components/screens/journey/ProgressTab.tsx:148-248` (original) — Full AI upload flow with progress bar + feedback rendering. Move this logic to BoostTab.
  - `src/app/components/screens/boost/BoostTab.tsx` (from T9) — Target location for AI analysis feature

  **API/Type References**:
  - T3's `switchTab` callback — Used by AICoachCard to navigate to Boost tab

  **Acceptance Criteria**:

  ```
  Scenario: Journey AI card links to Boost tab
    Tool: Playwright
    Preconditions: Dev server, Journey tab
    Steps:
      1. Navigate to Journey tab
      2. Find the AI promo card (indigo/purple gradient)
      3. Assert "View Plan" or similar CTA button exists
      4. Assert NO "Upload Video" button in Journey
      5. Click CTA button
      6. Verify app switches to Boost tab
    Expected Result: AI card is promotional only, links to Boost
    Evidence: .sisyphus/evidence/task-14-ai-promo-card.png

  Scenario: AI analysis available in Boost tab
    Tool: Playwright
    Preconditions: On Boost tab
    Steps:
      1. Scroll to "AI Technique Analysis" section
      2. Click "Upload Video" button
      3. Wait for simulated upload progress
      4. Assert technique feedback cards appear (Footwork, Body Position, Next Focus)
    Expected Result: Full AI analysis flow works in Boost tab
    Evidence: .sisyphus/evidence/task-14-ai-analysis-boost.png
  ```

  **Commit**: YES
  - Message: `feat(boost): move AI analysis from Journey to Boost tab`
  - Files: `src/app/components/screens/journey/AICoachCard.tsx`, `src/app/components/screens/boost/BoostTab.tsx`
  - Pre-commit: `npm run build`

- [ ] 15. Venue Review Form from Calendar Expired Bookings

  **What to do**:
  - In `CalendarSection.tsx` (from T8), implement the "Write Review" button action:
    - When user clicks "Write Review" on an expired booking card, open a Review Form modal (using shared Modal from T2)
  - **Review Form Modal**:
    - Gym name displayed at top (from the CalendarEvent data)
    - 4 rating dimensions, each with 1-5 star selector:
      - Overall Environment
      - Route Design
      - Equipment Quality
      - Value for Money
    - Optional text comment textarea (max 200 characters, character counter)
    - "Submit Review" button
    - On submit: add review to `venueReviews` state (via callback from App.tsx), mark the CalendarEvent as `isReviewed: true`, close modal
    - After review submitted: the Calendar event card shows "Reviewed ✓" instead of "Write Review"
  - Follow the star rating pattern from `PartnersTab.tsx ReviewSheet`
  - The new review should appear in the GymDetailScreen reviews section (T10) since both read from the same state

  **Must NOT do**:
  - Do not allow editing or deleting reviews after submission
  - Do not add review entry from anywhere other than Calendar expired bookings
  - Do not implement multi-user reviews — all from "Emma"

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Form with star ratings, state updates, cross-component data flow
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T12, T13, T14, T16)
  - **Blocks**: None
  - **Blocked By**: T1, T2, T5, T8, T10

  **References**:

  **Pattern References**:
  - `src/app/components/screens/social/PartnersTab.tsx:711-799` — `ReviewSheet` with star rating rows per dimension. DIRECTLY reference this pattern for the 4 venue dimensions.
  - `src/app/components/screens/journey/CalendarSection.tsx` (from T8) — Expired booking cards with "Write Review" button.
  - `src/app/components/layout/Modal.tsx` (from T2) — Shared modal wrapper.

  **API/Type References**:
  - `src/app/types/index.ts:VenueReview` — `{ id, gymId, authorName, date, environment, routeDesign, equipment, value, text? }`
  - `src/app/types/index.ts:CalendarEvent` — `isReviewed` field to toggle after submission
  - State callbacks from App.tsx: `addReview(review)`, `markEventReviewed(eventId)`

  **Acceptance Criteria**:

  ```
  Scenario: Write review from expired Calendar booking
    Tool: Playwright
    Preconditions: Dev server, Journey tab, Calendar showing expired booking
    Steps:
      1. Navigate to Journey tab, find Calendar
      2. Click a date with an expired booking
      3. Click "Write Review" button on the expired booking card
      4. Assert review form modal opens with gym name
      5. Set ratings: Environment=4, Route Design=5, Equipment=3, Value=4
      6. Type optional comment: "Great routes but needs new holds"
      7. Click "Submit Review"
      8. Assert modal closes
      9. Assert Calendar event now shows "Reviewed ✓" instead of "Write Review"
    Expected Result: Full review submission flow works
    Evidence: .sisyphus/evidence/task-15-review-form.png

  Scenario: Review appears in gym detail
    Tool: Playwright
    Steps:
      1. After submitting review above, navigate to Explore tab
      2. Open the same gym's detail page
      3. Click "Reviews" tab
      4. Assert the new review from "Emma" is visible with the ratings entered
    Expected Result: Review flows from Calendar → Gym Detail
    Evidence: .sisyphus/evidence/task-15-review-in-gym.png

  Scenario: Already-reviewed booking shows reviewed state
    Tool: Playwright
    Steps:
      1. Return to Calendar, click the same expired date
      2. Assert the booking shows "Reviewed ✓" badge
      3. Assert "Write Review" button is NOT present
    Expected Result: Cannot double-review
    Evidence: .sisyphus/evidence/task-15-reviewed-state.png
  ```

  **Commit**: YES
  - Message: `feat(reviews): add venue review form from Calendar expired bookings`
  - Files: `src/app/components/screens/journey/CalendarSection.tsx`, `src/app/App.tsx`
  - Pre-commit: `npm run build`

- [ ] 16. Cross-Tab Links: AI Promo → Boost + Tutorial "Know More" → Boost

  **What to do**:
  - **AI Promo Link** (if not already done in T14):
    - Verify `AICoachCard.tsx` CTA button calls `switchTab('boost')` and works end-to-end
    - Test the full flow: Journey → click AI card → lands on Boost tab → AI plan section visible
  - **Tutorial "Know More" Link**:
    - In `src/app/components/screens/explore/GettingStartedScreen.tsx`:
    - At the bottom of the tutorial content (after the last accordion section), add a text link:
      - Text: "Want to level up faster? Explore our training courses →"
      - Style: `text-slate-500 text-sm` (grey small text, matching user's description of "灰色小字")
      - On click: calls `switchTab('boost')` to navigate to the Boost tab
    - The link should feel natural at the end of the beginner tutorial — a gentle nudge toward courses
  - Ensure the `switchTab` callback is available in `GettingStartedScreen` (passed via props from App.tsx through navigation)

  **Must NOT do**:
  - Do not add large banners or promotional cards — keep it subtle ("灰色小字")
  - Do not change tutorial content itself
  - Do not add links to every page — only these two specific locations

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two small link additions — minimal code change
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T12, T13, T14, T15)
  - **Blocks**: None
  - **Blocked By**: T3, T9, T14

  **References**:

  **Pattern References**:
  - `src/app/components/screens/explore/GettingStartedScreen.tsx` — Bottom of tutorial content. Find the last section and add text link below.
  - `src/app/components/screens/journey/AICoachCard.tsx` (from T14) — Already has switchTab call. Verify it works.
  - `src/app/components/screens/explore/GymsTab.tsx:80` — "Read our Getting Started guide →" link pattern. Similar style for "know more" link.

  **API/Type References**:
  - T3's `switchTab` callback — Passed to GettingStartedScreen via navigation props

  **Acceptance Criteria**:

  ```
  Scenario: Tutorial "know more" links to Boost tab
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to Explore tab
      2. Click "Getting Started" banner
      3. Scroll to bottom of tutorial content
      4. Assert grey text link visible containing "training courses" or similar
      5. Click the link
      6. Assert app navigates to Boost tab
    Expected Result: Tutorial → Boost navigation works
    Evidence: .sisyphus/evidence/task-16-know-more.png

  Scenario: Journey AI card → Boost tab end-to-end
    Tool: Playwright
    Steps:
      1. Navigate to Journey tab
      2. Click AI promo card CTA
      3. Assert Boost tab is now active
      4. Assert AI daily plan section is visible
    Expected Result: Journey → Boost cross-tab navigation works
    Evidence: .sisyphus/evidence/task-16-ai-to-boost.png
  ```

  **Commit**: YES
  - Message: `feat(nav): add cross-tab links (AI promo→Boost, tutorial know more→Boost)`
  - Files: `src/app/components/screens/explore/GettingStartedScreen.tsx`, `src/app/components/screens/journey/AICoachCard.tsx`
  - Pre-commit: `npm run build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read `.sisyphus/plans/climbuddy-features.md` end-to-end. For each "Must Have": verify implementation exists (read file, check component). For each "Must NOT Have": search codebase for forbidden patterns (raw borders without `S.*`, new npm deps in package.json, actual `<video>` elements). Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` and `npm run build`. Review all changed/new files for: `as any`/`@ts-ignore`, empty catches, `console.log` in production, commented-out code, unused imports. Check Neobrutalist compliance: every card uses `S.border + S.shadow`, every button uses `S.press`. Verify no raw `border-2` or `shadow-[...]` without `S.*`.
  Output: `Build [PASS/FAIL] | TSC [PASS/FAIL] | Style Compliance [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state (`npm run dev`). Execute EVERY QA scenario from EVERY task — follow exact steps, capture screenshots. Test cross-tab navigation flows (Journey AI → Boost, Tutorial → Boost). Test all modals are fixed above bottom nav. Test Calendar month navigation. Test session recording full flow. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Cross-Tab [N/N] | Modals [N/N fixed] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual code diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance across ALL tasks. Flag unaccounted changes or scope creep (extra features, unnecessary abstractions). Verify mock data counts (≤6 per collection).
  Output: `Tasks [N/N compliant] | Scope Creep [CLEAN/N issues] | Mock Limits [CLEAN/N over] | VERDICT`

---

## Commit Strategy

| Commit | Message | Key Files | Pre-commit Check |
|--------|---------|-----------|-----------------|
| 1 | `feat(types): extend interfaces for all 10 features + scaffold mock data` | types/index.ts, mockData.ts | `npx tsc --noEmit` |
| 2 | `feat(ui): add shared Modal component with fixed positioning` | components/layout/Modal.tsx | `npm run build` |
| 3 | `feat(nav): add Boost tab to BottomNav + cross-tab navigation` | BottomNav.tsx, App.tsx | `npm run build` |
| 4 | `refactor(journey): split ProgressTab into sub-components` | journey/*.tsx | `npm run build` |
| 5 | `refactor(state): lift sessions/calendar/reviews state to App.tsx` | App.tsx, ProgressTab.tsx | `npm run build` |
| 6 | `feat(badges): add earned timestamps to badge detail modal` | BadgeGrid.tsx, types | `npm run build` |
| 7 | `feat(sessions): enhance recording with video + smartwatch data` | SessionHistory.tsx, LogSessionModal | `npm run build` |
| 8 | `feat(calendar): add monthly calendar view to Journey page` | CalendarSection.tsx | `npm run build` |
| 9 | `feat(boost): scaffold Boost tab with free/paid course sections` | boost/BoostTab.tsx | `npm run build` |
| 10 | `feat(gym): add read-only review display to gym detail` | GymDetailScreen.tsx | `npm run build` |
| 11 | `refactor(modals): migrate existing modals to shared Modal component` | ProgressTab, GymDetail, PartnersTab | `npm run build` |
| 12 | `feat(boost): add AI daily training plan section` | BoostTab.tsx | `npm run build` |
| 13 | `feat(boost): add coach section with publishable courses` | BoostTab.tsx | `npm run build` |
| 14 | `feat(boost): move AI analysis from Journey to Boost tab` | BoostTab.tsx, ProgressTab | `npm run build` |
| 15 | `feat(reviews): add venue review form from Calendar expired bookings` | CalendarSection, GymDetailScreen | `npm run build` |
| 16 | `feat(nav): add cross-tab links (AI promo→Boost, tutorial know more→Boost)` | ProgressTab, GettingStartedScreen | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: Build succeeds with 0 errors
npx tsc --noEmit       # Expected: No TypeScript errors
npm run dev            # Expected: Dev server starts, no console errors
```

### Final Checklist
- [ ] All "Must Have" items present and verified
- [ ] All "Must NOT Have" items absent from codebase
- [ ] All 4 bottom tabs render without truncation at 390px
- [ ] Every modal stays fixed when page scrolls
- [ ] Cross-tab navigation flows work end-to-end
- [ ] Build passes cleanly
