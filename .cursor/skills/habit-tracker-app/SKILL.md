---
name: habit-tracker-app
description: >-
  Builds lightweight daily habit tracker web apps with vanilla HTML/CSS/JS,
  localStorage persistence, streak stats, and responsive UI. Use when creating
  habit trackers,打卡应用, daily check-in apps, streak counters, or 习惯养成 tools.
---

# Habit Tracker App Builder

## Tech stack (default)

- Vanilla HTML5 + CSS3 + ES6 modules (no framework)
- `localStorage` key: `habit-tracker-v1`
- Single-page: `index.html`, `styles.css`, `app.js`

## Project layout

```
app/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Data model

```javascript
// habits: Array<{ id, name, color, createdAt }>
// records: { [habitId]: { [dateISO]: boolean } }  // dateISO = YYYY-MM-DD
```

## Build workflow

Copy and track:

```
- [ ] Scaffold HTML shell (header, habit list, add form, stats)
- [ ] Implement storage load/save helpers
- [ ] CRUD habits (add, delete, max 12)
- [ ] Toggle check-in for today per habit
- [ ] Compute streak + weekly completion rate
- [ ] Style: mobile-first, card layout, accent per habit color
- [ ] Empty state when no habits
```

## UI requirements

1. **Header**: app title + today's date (locale `zh-CN`)
2. **Habit cards**: name, color dot, today toggle button, streak badge, 7-day mini heatmap
3. **Add habit**: input + color picker (6 preset colors) + submit
4. **Stats bar**: total habits, checked today count, best streak
5. **Theme**: CSS variables `--bg`, `--surface`, `--accent`, `--text`; prefer soft dark theme

## Core logic

**Streak** (consecutive days ending today or yesterday):

```javascript
function calcStreak(records, habitId) {
  let streak = 0;
  let d = new Date();
  const today = formatDate(d);
  const rec = records[habitId] || {};
  if (!rec[today]) d.setDate(d.getDate() - 1); // allow yesterday anchor
  while (rec[formatDate(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
```

**Weekly rate**: checked days in last 7 / 7.

## Accessibility

- Buttons have `aria-label`
- Focus visible outline on interactive elements
- Minimum touch target 44px

## Do not

- Add backend or npm build step unless user explicitly requests
- Use external CDN for core logic (offline-first)
- Store passwords or PII

## Additional resources

- UI tokens and heatmap markup: [reference.md](reference.md)
- Sample interactions: [examples.md](examples.md)
