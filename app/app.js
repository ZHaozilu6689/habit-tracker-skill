const KEY = 'habit-tracker-v1';
const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];
const MAX_HABITS = 12;

let state = load();
let selectedColor = COLORS[0];

const todayEl = document.getElementById('today-date');
const statTotal = document.getElementById('stat-total');
const statToday = document.getElementById('stat-today');
const statBest = document.getElementById('stat-best');
const habitList = document.getElementById('habit-list');
const addForm = document.getElementById('add-form');
const habitNameInput = document.getElementById('habit-name');
const colorPicker = document.querySelector('.color-picker');

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { habits: [], records: {} };
  } catch {
    return { habits: [], records: {} };
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function getTodayISO() {
  return formatDate(new Date());
}

function calcStreak(records, habitId) {
  let streak = 0;
  const d = new Date();
  const today = formatDate(d);
  const rec = records[habitId] || {};
  if (!rec[today]) d.setDate(d.getDate() - 1);
  while (rec[formatDate(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function weeklyRate(records, habitId) {
  const rec = records[habitId] || {};
  let checked = 0;
  const d = new Date();
  for (let i = 0; i < 7; i++) {
    if (rec[formatDate(d)]) checked++;
    d.setDate(d.getDate() - 1);
  }
  return Math.round((checked / 7) * 100);
}

function getLast7Days() {
  const days = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const copy = new Date(d);
    copy.setDate(copy.getDate() - i);
    days.push(formatDate(copy));
  }
  return days;
}

function initHeader() {
  const now = new Date();
  const formatted = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  todayEl.textContent = formatted;
  todayEl.setAttribute('datetime', getTodayISO());
}

function initColorPicker() {
  colorPicker.innerHTML = COLORS.map((color, i) => `
    <button
      type="button"
      class="color-option${i === 0 ? ' selected' : ''}"
      style="background-color: ${color}"
      data-color="${color}"
      aria-label="颜色 ${color}"
      aria-pressed="${i === 0}"
    ></button>
  `).join('');

  colorPicker.addEventListener('click', (e) => {
    const btn = e.target.closest('.color-option');
    if (!btn) return;
    selectedColor = btn.dataset.color;
    colorPicker.querySelectorAll('.color-option').forEach((el) => {
      el.classList.toggle('selected', el === btn);
      el.setAttribute('aria-pressed', el === btn);
    });
  });
}

function updateStats() {
  const today = getTodayISO();
  let checkedToday = 0;
  let bestStreak = 0;

  state.habits.forEach((h) => {
    const rec = state.records[h.id] || {};
    if (rec[today]) checkedToday++;
    const s = calcStreak(state.records, h.id);
    if (s > bestStreak) bestStreak = s;
  });

  statTotal.textContent = state.habits.length;
  statToday.textContent = checkedToday;
  statBest.textContent = bestStreak;
}

function renderHabits() {
  if (state.habits.length === 0) {
    habitList.innerHTML = `
      <div class="empty-state">
        <p>还没有习惯</p>
        <p class="hint">添加第一个习惯，开始每日打卡吧</p>
      </div>
    `;
    updateStats();
    return;
  }

  const today = getTodayISO();
  const last7 = getLast7Days();

  habitList.innerHTML = state.habits.map((h) => {
    const rec = state.records[h.id] || {};
    const isChecked = !!rec[today];
    const streak = calcStreak(state.records, h.id);
    const rate = weeklyRate(state.records, h.id);

    const heatmap = last7.map((date) => {
      const checked = rec[date] ? ' checked' : '';
      return `<span class="day${checked}" title="${date}"></span>`;
    }).join('');

    return `
      <article class="habit-card" style="--habit-color: ${h.color}" data-id="${h.id}">
        <div class="habit-card-header">
          <span class="habit-dot" style="background: ${h.color}"></span>
          <h2 class="habit-name">${escapeHtml(h.name)}</h2>
          <span class="streak-badge">🔥 ${streak} 天</span>
        </div>
        <div class="habit-meta">
          <span>本周完成 ${rate}%</span>
          <div class="heatmap" aria-label="近7天打卡">${heatmap}</div>
        </div>
        <div class="habit-actions">
          <button
            type="button"
            class="btn btn-check${isChecked ? ' checked' : ''}"
            data-action="toggle"
            data-id="${h.id}"
            aria-label="${isChecked ? '取消今日打卡' : '今日打卡'}：${escapeHtml(h.name)}"
          >${isChecked ? '✓ 已打卡' : '今日打卡'}</button>
          <button
            type="button"
            class="btn btn-icon"
            data-action="delete"
            data-id="${h.id}"
            aria-label="删除习惯：${escapeHtml(h.name)}"
          >×</button>
        </div>
      </article>
    `;
  }).join('');

  updateStats();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function addHabit(name, color) {
  if (state.habits.length >= MAX_HABITS) {
    alert(`最多添加 ${MAX_HABITS} 个习惯`);
    return false;
  }
  const trimmed = name.trim();
  if (!trimmed) return false;
  if (state.habits.some((h) => h.name === trimmed)) {
    alert('该习惯已存在');
    return false;
  }
  state.habits.push({
    id: crypto.randomUUID(),
    name: trimmed,
    color,
    createdAt: Date.now(),
  });
  save();
  return true;
}

function toggleCheckIn(habitId) {
  const today = getTodayISO();
  if (!state.records[habitId]) state.records[habitId] = {};
  state.records[habitId][today] = !state.records[habitId][today];
  if (!state.records[habitId][today]) delete state.records[habitId][today];
  save();
}

function deleteHabit(habitId) {
  if (!confirm('确定删除这个习惯吗？相关打卡记录也会清除。')) return;
  state.habits = state.habits.filter((h) => h.id !== habitId);
  delete state.records[habitId];
  save();
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addHabit(habitNameInput.value, selectedColor)) {
    habitNameInput.value = '';
    renderHabits();
  }
});

habitList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === 'toggle') {
    toggleCheckIn(id);
    renderHabits();
  } else if (btn.dataset.action === 'delete') {
    deleteHabit(id);
    renderHabits();
  }
});

function seedDemoData() {
  if (state.habits.length > 0) return;
  const demo = [
    { name: '晨跑', color: '#22c55e' },
    { name: '阅读30分钟', color: '#6366f1' },
    { name: '冥想', color: '#06b6d4' },
  ];
  const today = getTodayISO();
  demo.forEach((d) => {
    const id = crypto.randomUUID();
    state.habits.push({ id, name: d.name, color: d.color, createdAt: Date.now() });
    state.records[id] = {};
    const rec = state.records[id];
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      if (Math.random() > 0.3) rec[formatDate(date)] = true;
    }
    rec[today] = Math.random() > 0.4;
  });
  save();
}

// Uncomment for first-run demo; enabled for screenshot showcase
seedDemoData();

initHeader();
initColorPicker();
renderHabits();
