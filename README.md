# Cursor AI Skill 实践项目

本项目演示 **自定义 Cursor Agent Skill** 的创建方法，并使用该 Skill 指导开发「每日习惯」打卡 Web 应用。

## 项目结构

```
.
├── .cursor/skills/habit-tracker-app/   # 自定义 Skill
│   ├── SKILL.md                        # 主指令（必需）
│   ├── reference.md                    # 参考文档
│   └── examples.md                     # 使用示例
├── app/                                # 按 Skill 开发的应用
├── docs/                               # 文档与效果图
├── submission/                         # 作业提交物（压缩包等）
└── docs/SKILL_GUIDE.md                 # Skill 结构说明
```

## GitHub 分享

将本仓库推送到 GitHub 后，分享链接格式：

`https://github.com/<你的用户名>/cursor-habit-tracker-skill`

详细步骤见 [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)。

## 快速体验应用

```bash
cd app
npx --yes serve . -p 3456
```

浏览器打开 http://localhost:3456

## Skill 如何使用

1. 将 `.cursor/skills/habit-tracker-app` 放在项目内（已包含）
2. 在 Cursor 中打开本项目
3. 对话中说：「用 habit-tracker 技能帮我做一个打卡应用」
4. Agent 会自动读取 `SKILL.md` 并按规范实现

## 作业提交清单

| 提交项 | 路径 |
|--------|------|
| Skill 压缩包 | `submission/habit-tracker-app-skill.zip` |
| 应用文件 | `app/` 目录 |
| 效果图 | `docs/screenshots/` |
| GitHub 链接 | 见 README 顶部或 `submission/github-link.txt` |
