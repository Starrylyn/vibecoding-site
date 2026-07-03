# Vibecoding 实践分享

> 当代码开始呼吸——记录 Vibecoding 实践

基于 Next.js 的静态博客网站，Zach Lieberman 启发的纯黑白手绘构造线风格。

## 🚀 在线访问

- **生产地址**: https://vibecoding-site-eta.vercel.app
- **GitHub**: https://github.com/Starrylyn/vibecoding-site

## 📦 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问
open http://localhost:3000
```

## 🔧 构建与部署

### 本地构建

```bash
npm run build
```

构建产物在 `out/` 目录，可直接部署到任何静态托管服务。

### 一键部署到 Vercel

推送代码到 `main` 分支后，Vercel 自动部署（已配置 GitHub 集成）：

```bash
git push origin main
```

也可以通过 Vercel CLI 手动部署：

```bash
npx vercel --prod
```

## 📝 内容管理

所有文章以 Markdown 文件存放在 `content/posts/` 目录：

```
content/posts/
├── vibecoding-awakening.md       # 文章 1
├── zero-to-launch-vibecoding.md  # 文章 2
└── vibecoding-toolchain-2025.md  # 文章 3
```

### 添加新文章

1. 在 `content/posts/` 目录新建 `.md` 文件
2. 添加 YAML frontmatter：

```yaml
---
title: "文章标题"
date: "2025-12-01"
excerpt: "文章摘要描述"
tags: ["标签1", "标签2"]
slug: "article-slug"
---
```

3. 文件名需与 slug 一致（不含 `.md` 后缀）
4. 推送代码即可自动更新网站

## 🎨 设计风格

参考 **Zach Lieberman** 的代码生成艺术哲学：

- 纯黑白配色，无彩色
- 手绘构造线视觉（网格点、边角标记、虚线分隔）
- IBM Plex Mono + Space Grotesk 字体
- 过程可见化——如草稿本摊开

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | 手写 CSS（零框架依赖） |
| 内容 | Markdown + 自建解析器 |
| 部署 | Vercel（GitHub 自动集成） |
| 构建 | `next build` → 静态导出 |

## 📂 项目结构

```
src/
├── app/
│   ├── about/page.tsx           # 关于页面
│   ├── posts/[slug]/page.tsx    # 文章详情（SSG）
│   ├── globals.css              # 全局样式（Zach Lieberman 风格）
│   ├── layout.tsx               # 根布局 + SEO meta
│   └── page.tsx                 # 首页（文章列表）
├── components/
│   ├── ConstructionImage.tsx    # 手绘边框图片组件
│   ├── SketchFooter.tsx         # 页脚
│   └── SketchHeader.tsx         # 导航头
└── lib/
    └── posts.ts                 # Markdown 解析 & 查询

content/
└── posts/                       # 文章 Markdown 文件
```

## 📄 许可

CC BY-SA 4.0
