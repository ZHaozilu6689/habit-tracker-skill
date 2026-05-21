# Habit Tracker — Reference

## Color presets

```javascript
const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];
```

## CSS variables

```css
:root {
  --bg: #0f1419;
  --surface: #1a2332;
  --surface-hover: #243044;
  --text: #e7ecf3;
  --text-muted: #8b9cb3;
  --accent: #6366f1;
  --success: #22c55e;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}
```

## 7-day heatmap HTML pattern

```html
<div class="heatmap" aria-label="近7天打卡">
  <!-- 7 spans, class "day" + "checked" if true -->
</div>
```

## Storage helpers

```javascript
const KEY = 'habit-tracker-v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { habits: [], records: {} };
  } catch {
    return { habits: [], records: {} };
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
```

## formatDate

```javascript
function formatDate(d) {
  return d.toISOString().slice(0, 10);
}
```
