# Gym Tracker

A mobile-first Progressive Web App for logging workouts, reviewing exercise history, tracking body weight, timing rests, and getting simple progressive overload suggestions.

Current version: `v1.0.0`

## Structure

```text
/
├── index.html
├── css/
├── js/
├── data/
├── icons/
├── manifest.json
└── sw.js
```

## Features

- Static GitHub Pages compatible app shell
- Offline support with a service worker
- Local-first workout and body-weight storage using `localStorage`
- Locally editable app display name
- Export/import local data when moving between deployment URLs
- Workout Library with the Version 1.1 A/B/C program
- Generic seeded sample history for the V1.1 program
- Previous workout display per exercise
- Workout completion tracking
- Pre-workout recovery status
- Per-exercise pain/discomfort tracking and notes
- Session notes plus energy, general discomfort, and soreness ratings
- Weekly dashboard stats for completed workouts, streak, last workout, and average ratings
- Progressive overload suggestions
- iPhone Safari friendly viewport, touch targets, safe-area spacing, and Apple touch icon

## Usage

1. Open the Dashboard to see the active workout, completion progress, previous workout, and current progression suggestions.
2. Use the App Name section on the Dashboard to set a local display name if you want one.
3. Open the Library tab to choose one of the Version 1.1 templates:
   - Workout A — Foundation Push/Pull
   - Workout B — Legs + Upper Body
   - Workout C — Full Body Growth
4. Select your pre-workout recovery status before starting. Workout C can optionally add one Week 4+ finisher.
5. Tap Start workout on a template to create a new local session for today.
6. Use the Log tab to enter load, reps, or time for each set. Matching exercise history is shown on each exercise card.
7. Record pain/discomfort and optional notes per exercise. These notes are stored only in localStorage on the device.
8. At the end, add session notes and ratings for energy, general discomfort areas, and soreness before workout.
9. Tap Finish workout to save the session to local history. Future targets are suggested from the last completed matching exercise.
10. Use the History tab to edit a saved workout. Saving changes replaces that history entry instead of creating a duplicate; Cancel edit exits without changing the saved entry.
11. Use Export data before changing deployment URLs, then Import data on the new URL to restore local data.
12. Use the Weight and Timer tabs for body-weight entries and rest timing. All data stays in `localStorage` on the device.

## Version 1.1 Program

Workout A — Foundation Push/Pull:

- Dumbbell Bench Press: 2 sets x 8-10 reps
- Seated Cable Row: 3 sets x 8-10 reps
- Lat Pulldown: 3 sets x 8-10 reps
- Dumbbell Lateral Raise: 3 sets x 12-15 reps
- Hammer Curl: 3 sets x 10-12 reps
- Rope Pushdown: 3 sets x 10-12 reps

Workout B — Legs + Upper Body:

- Goblet Squat: 2 sets x 8-10 reps
- Seated Leg Curl: 3 sets x 10-12 reps
- Leg Extension: 2 sets x 10-12 reps
- Incline Dumbbell Press: 3 sets x 8-10 reps
- Chest Supported Row: 3 sets x 8-10 reps
- Alternating Dumbbell Curl: 3 sets x 10-12 reps
- Plank: 3 sets

Workout C — Full Body Growth:

- Dumbbell Bench Press: 2 sets x 8-10 reps
- Lat Pulldown: 3 sets x 8-10 reps
- Seated Cable Row: 3 sets x 8-10 reps
- Dumbbell Lateral Raise: 3 sets x 12-15 reps
- Hammer Curl: 3 sets x 10-12 reps
- Rope Pushdown: 3 sets x 10-12 reps

Optional Week 4+ finisher for Workout C: choose Cable Fly or Incline Dumbbell Curl, not both.

## Privacy

The repository contains only generic templates, generic sample data, and app code. The editable app name, personal workout notes, discomfort notes, ratings, body weight entries, and workout history entered in the app are stored in browser `localStorage` on the device.

There is no backend, account system, telemetry, analytics, or remote sync. Clearing the browser's site data will remove local workout data.

Use the Dashboard's Data Transfer section before changing domains or deployment providers. Export downloads a JSON file containing this app's local workout history, active workout, body weight entries, app display name, and app settings. Import restores that JSON onto the current URL's `localStorage`.

## Versioning

Releases use semantic version tags:

- Patch versions for fixes that do not change app behavior or data shape.
- Minor versions for new features that remain backward compatible.
- Major versions for breaking changes, including local data format changes that cannot be migrated automatically.

## Gym Buddy Image

The dashboard hero image lives at `assets/images/tiger-gym-buddy.png`. To replace it later, put a new PNG at the same path and keep the filename unchanged.

The app intentionally avoids official gym branding, logos, and trademarks in the UI. If you replace the image, use a generic dark gym photo or crop/edit the image so no protected brand marks are visible.

If the image is missing, the hero card falls back to a dark red/charcoal CSS gradient.

Optional image assets:

- `assets/images/tiger-gym-buddy.png` for the dashboard hero
- `assets/images/tiger-action.png` for workout library graphics
- `assets/images/gym-equipment.png` for history or empty-state graphics
- `assets/images/dumbbells-closeup.png` for progress/exercise graphics

Reusable inline icon SVGs live in `assets/icons/`. CSS applies them as masks, so icons inherit the surrounding text color.

Theme CSS is split into:

- `css/styles.css` for the base app layout
- `css/theme.css` for global theme tokens, typography, background texture, focus states, and motion preferences
- `css/components.css` for polished cards, buttons, media panels, badges, icons, and interaction states

## Local Testing

Run a static server from the repository root:

```bash
python3 -m http.server 4177
```

Then open `http://127.0.0.1:4177/`. Use a fresh port if the browser is holding an older service worker cache during testing.

Testing checklist:

- Dashboard hero image loads with readable text overlay.
- Workout Library cards are tappable and start a fresh session.
- Workout logging, history, body weight, timer, and progression suggestions still work.
- Export downloads a JSON file and Import restores it on a clean browser/profile.
- `New best effort` appears only after beating a previous matching exercise.
- Refresh once after deploy if the service worker is still serving an older cached version.

## GitHub Pages

This app has no build step. Enable GitHub Pages for the repository and serve from the root of the branch you publish. The manifest uses relative URLs, so it works from a repository subpath such as `https://drosair.github.io/gym-tracker/`.
