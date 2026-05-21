# Habit Tracker — Examples

## Example: add habit

**User**: 帮我加一个「晨跑」习惯

**Agent actions**:
1. Append `{ id: crypto.randomUUID(), name: '晨跑', color: '#22c55e', createdAt: Date.now() }`
2. Re-render list
3. Persist via `save(state)`

## Example: check in today

**User**: 今天完成冥想打卡

**Agent**: Find habit by name, set `records[habitId][todayISO] = true`, update streak UI.

## Example: empty state copy

```html
<div class="empty-state">
  <p>还没有习惯</p>
  <p class="hint">添加第一个习惯，开始每日打卡吧</p>
</div>
```
