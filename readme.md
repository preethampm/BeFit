# BeFit — Source of Truth

## What is this app
BeFit is a personal gym progress tracker and workout logger. It is a mobile-first app built for one user (the developer). There is no backend, no authentication, no accounts. All data is stored locally on the device.

---

## Tech stack
- **Framework**: React Native
- **Tooling**: Expo (using Expo Go for local development and testing)
- **Storage**: AsyncStorage from `@react-native-async-storage/async-storage`
- **Language**: JavaScript (no TypeScript)
- **Navigation**: Tab-based, 4 tabs, no external navigation library needed

---

## Project origin
The app was originally prototyped as a single React web component (`BeFit.jsx`) running in a browser. It is now being rewritten as a React Native / Expo app. The logic, data structure, and features from that prototype must be preserved exactly. Only the UI layer changes (web elements replaced with React Native equivalents).

---

## Design principles
- Clean and minimal. No gradients, no heavy colors, no decorative effects.
- White/light background. Good contrast. Readable at a glance.
- Mobile-first. Everything designed for a phone screen (max width ~430px).
- No external UI libraries. Use StyleSheet.create for all styling.
- Consistent spacing, typography, and border radius throughout.

---

## App structure — 4 tabs

### 1. Log
The main screen. Used after every gym session.
- User picks an exercise from a grouped dropdown (grouped by category)
- User adds one or more sets, each with reps and weight (or just reps for bodyweight exercises)
- Optional note field (e.g. "felt strong today")
- Save button writes the entry to storage
- Shows a brief success confirmation after saving
- Tapping "Log" on any exercise in the Library tab navigates here with that exercise pre-selected

### 2. History
Shows all logged workout sessions in reverse chronological order.
- Each entry shows: exercise name, date, all sets (reps + weight), optional note
- Each entry has a delete button
- Shows total session count at the top
- Empty state message if no workouts logged yet

### 3. Progress
Tracks improvement over time for any exercise.
- User picks an exercise from a dropdown
- Shows personal record (PR) — the highest weight or rep count ever logged for that exercise
- Shows how many times that exercise has been logged
- Bar chart showing best value per session over time (x-axis = date, y-axis = best set value)
- Grid of all exercises that have at least one logged session, each showing their PR
- Empty state if nothing logged yet

### 4. Library
Browse all available exercises.
- Search bar to filter by name
- Horizontal scrollable category filter pills: All, Chest, Back, Legs, Shoulders, Arms, Core, Cardio
- Each exercise shows its name, category, and unit
- "Log" button on each exercise navigates to the Log tab with that exercise pre-selected

---

## Exercise library (built-in, read-only)

| ID | Name | Category | Unit |
|---|---|---|---|
| bench | Bench Press | Chest | kg |
| squat | Squat | Legs | kg |
| deadlift | Deadlift | Back | kg |
| ohp | Overhead Press | Shoulders | kg |
| row | Barbell Row | Back | kg |
| pullup | Pull-up | Back | reps |
| dip | Dip | Chest | reps |
| curl | Bicep Curl | Arms | kg |
| tricep | Tricep Pushdown | Arms | kg |
| lunge | Lunge | Legs | kg |
| legpress | Leg Press | Legs | kg |
| calfr | Calf Raise | Legs | kg |
| lateralr | Lateral Raise | Shoulders | kg |
| plank | Plank | Core | sec |
| crunch | Crunch | Core | reps |
| run | Running | Cardio | km |
| bike | Cycling | Cardio | km |
| rowing | Rowing Machine | Cardio | m |

---

## Data structure

All data is stored under the key `befit_v1` in AsyncStorage as a JSON string.

```json
{
  "workouts": [
    {
      "id": 1711612800000,
      "date": "2026-03-28T10:00:00.000Z",
      "exId": "bench",
      "sets": [
        { "reps": "8", "weight": "80" },
        { "reps": "6", "weight": "85" }
      ],
      "note": "felt strong today"
    }
  ]
}
```

### Field notes
- `id` — timestamp from `Date.now()`, used as unique key
- `date` — full ISO string, used for display and chart grouping
- `exId` — matches the `id` field in the exercise library
- `sets` — array of objects, reps and weight are stored as strings
- `note` — optional string, can be empty or omitted
- Workouts are stored newest first (unshift on save)

---

## Key logic

### PR calculation
For a given exercise ID, filter all workouts by `exId`, then loop through every set of every workout. For sets with weight, use `parseFloat(weight)`. For bodyweight/reps-only exercises, use `parseFloat(reps)`. The highest value found is the PR.

### Progress chart data
Group workouts by calendar day (`date.slice(0, 10)`). For each day, find the best set value (same logic as PR). Sort by date ascending. Plot as a bar chart with the most recent bar highlighted.

### Exercise unit logic
- If `unit === "reps"` — the set only has a reps field, no weight field
- If `unit === "kg"`, `"km"`, `"m"`, `"sec"` — the set has both reps and weight/value fields

---

## What to build next (planned features, not yet implemented)
1. Custom exercises — user can add their own exercise with name, category, unit. Stored in the same AsyncStorage object. Only custom exercises can be deleted.
2. Workout templates — user saves a named routine (e.g. "Push Day") as an ordered list of exercises. Can load a template in the Log tab to log each exercise in sequence.
3. Body weight tracking — separate section to log daily bodyweight with date, displayed as a line chart.
4. Data export — export all workout history as a CSV file.

---

## Development setup
- Run with: `npx expo start`
- Test on phone: install Expo Go (iOS App Store or Google Play), scan the QR code shown in the terminal
- Phone and computer must be on the same WiFi network
- No build step needed for development — Expo Go handles it

---

## Constraints and rules for AI agents
- Do not introduce TypeScript. Keep everything in plain JavaScript.
- Do not add any external UI component libraries (no NativeBase, no React Native Paper, etc.).
- Do not add a router or navigation library unless the complexity genuinely requires it. Tab state can be managed with useState.
- Do not change the data structure or storage key (`befit_v1`) without migrating existing data.
- Do not remove or change any existing feature without being explicitly asked.
- Always use StyleSheet.create for styles. No inline style objects on components.
- Keep all logic in a single file (`App.js`) unless the file exceeds ~600 lines, in which case split by tab into separate component files.
- When in doubt, do less and ask. Do not make assumptions about unspecified behaviour.