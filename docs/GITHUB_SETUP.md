# GitHub 发布指南

## 1. 在 GitHub 创建仓库

1. 登录 https://github.com/new
2. 仓库名建议：`cursor-habit-tracker-skill`
3. 选择 Public，不要勾选「Add a README」（本地已有）
4. 创建仓库

## 2. 本地推送

在项目根目录 `d:\AI\cursor\skill` 执行：

```powershell
git init
git add .
git commit -m "feat: add habit-tracker-app skill and demo web app"
git branch -M main
git remote add origin https://github.com/<你的用户名>/cursor-habit-tracker-skill.git
git push -u origin main
```

## 3. 记录分享链接

推送成功后，将以下地址写入作业：

```
https://github.com/<你的用户名>/cursor-habit-tracker-skill
```

也可保存到 `submission/github-link.txt`。

## 4. 可选：GitHub Pages 在线演示

1. 仓库 Settings → Pages
2. Source: Deploy from branch → `main` → `/app`
3. 访问：`https://<用户名>.github.io/cursor-habit-tracker-skill/`
