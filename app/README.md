# 每日习惯 · Habit Tracker

基于 `habit-tracker-app` Skill 开发的轻量级习惯打卡 Web 应用。

## 功能

- 添加 / 删除习惯（最多 12 个）
- 每日一键打卡
- 连续打卡天数（Streak）
- 近 7 天热力图
- 本周完成率统计
- 数据保存在浏览器 `localStorage`，无需后端

## 运行

直接用浏览器打开 `index.html`，或本地静态服务：

```bash
# 在 app 目录下
npx --yes serve . -p 3456
```

然后访问 http://localhost:3456

## 技术栈

- HTML5 + CSS3 + ES6 Module
- 无构建工具、无框架依赖
