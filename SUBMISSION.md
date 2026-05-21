# 作业提交指南

## 一、AI Skill 结构理解（摘要）

详见 [docs/SKILL_GUIDE.md](docs/SKILL_GUIDE.md)。

核心要点：

- Skill = 目录 + `SKILL.md`（YAML frontmatter + 工作流正文）
- `name` + `description` 决定 Agent 何时自动启用
- 复杂内容拆到 `reference.md` / `examples.md`（渐进式披露）

## 二、自定义 Skill

| 项目 | 内容 |
|------|------|
| 场景 | 习惯打卡 / 每日签到类 Web 应用 |
| Skill 名 | `habit-tracker-app` |
| 路径 | `.cursor/skills/habit-tracker-app/` |

## 三、提交物路径

| 要求 | 本地路径 |
|------|----------|
| Skill 压缩包 | `submission/habit-tracker-app-skill.zip` |
| 应用压缩包 | `submission/habit-tracker-app.zip` |
| 应用源码 | `app/` |
| 效果图 | `docs/screenshots/` 及 `submission/*.png` |
| GitHub 链接 | `submission/github-link.txt`（推送后填写） |

## 四、GitHub 分享

1. 按 [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md) 创建仓库并 `git push`
2. 将仓库 URL 写入 `submission/github-link.txt`
3. 作业中提交该 URL

## 五、本地预览

```powershell
cd d:\AI\cursor\skill\app
# 直接双击 index.html，或：
npx --yes serve . -p 3456
```
