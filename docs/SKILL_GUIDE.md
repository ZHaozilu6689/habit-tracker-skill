# AI Skill 结构说明与创建方法

## 什么是 Cursor Skill？

Skill 是存放在目录中的 **Markdown 指令包**，用于教 Agent 如何完成特定领域任务。Agent 根据 `description` 字段自动判断是否启用该 Skill。

## 目录结构

```
skill-name/
├── SKILL.md          # 必需 - 核心工作流与约束
├── reference.md      # 可选 - 详细 API / 样式参考
├── examples.md       # 可选 - 输入输出示例
└── scripts/          # 可选 - 可执行辅助脚本
```

## SKILL.md 必备部分

### 1. YAML Frontmatter

```yaml
---
name: habit-tracker-app          # 小写+连字符，≤64 字符
description: Builds lightweight... Use when creating habit trackers...
---
```

| 字段 | 要求 |
|------|------|
| `name` | 唯一标识，仅小写字母、数字、连字符 |
| `description` | 说明 **做什么** + **何时触发**，第三人称 |

### 2. 正文结构建议

- **Tech stack**：默认技术选型
- **Data model**：数据结构
- **Workflow**：分步清单（可勾选）
- **UI / Logic requirements**：具体规则
- **Do not**：反模式与禁止项
- **Additional resources**：链接到 reference / examples

## 存放位置

| 类型 | 路径 | 作用域 |
|------|------|--------|
| 项目级 | `.cursor/skills/<name>/` | 随仓库共享 |
| 个人级 | `~/.cursor/skills/<name>/` | 所有项目可用 |

**不要**写入 `~/.cursor/skills-cursor/`（Cursor 内置技能目录）。

## 创建流程（四阶段）

1. **Discovery**：明确场景、触发词、约束
2. **Design**：命名、description、章节大纲
3. **Implementation**：编写 SKILL.md 与附属文件
4. **Verification**：描述是否具体、正文是否 <500 行、术语是否一致

## 本项目的 Skill 设计

**场景**：用户需要快速搭建「习惯打卡类」纯前端 Web 应用。

**Skill 名称**：`habit-tracker-app`

**触发词**：habit tracker、打卡、习惯养成、streak、localStorage 习惯应用

**产出规范**：固定文件布局、数据模型、Streak 算法、暗色 UI、无障碍要求。

## 使用 Skill 开发应用

本次开发流程：

1. Agent 读取 `habit-tracker-app/SKILL.md`
2. 按 Workflow  checklist 依次实现
3. 参照 `reference.md` 中的 CSS 变量与存储键名
4. 输出 `app/index.html`、`styles.css`、`app.js`

这保证了 **可复现** 的开发体验：任何人在 Cursor 中加载该 Skill 都能得到结构一致的习惯追踪应用。
