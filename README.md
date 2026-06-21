# SharpNote

[![GitHub Stars](https://img.shields.io/github/stars/Coder-Lucas/sharp-note)](https://app.netlify.com/projects/shnt/deploys)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7a83d6f3-90f4-44cb-8b52-692fe724077e/deploy-status)](https://app.netlify.com/projects/shnt/deploys)

## 中文

**README** 文档中文篇。

### 项目目录

1. [SharpNote](#sharpnote)
    1. [中文](#中文)
        1. [目录](#项目目录)
        2. [项目描述](#项目描述)
        3. [立即开始](#立即开始)
        4. [本地部署](#本地部署)
            1. [使用 Docker](#使用-docker)
            2. [使用 nvm](#使用-nvm)
            3. [使用 fnm](#使用-fnm)
            4. [使用 Node.js v22.22.3](#使用-nodejs-v22220)
        5. [许可证](#许可证)
        6. [联系我们](#联系我们)
    2. [English](#english)
        1. ...

### 项目描述

**SharpNote**：你的 **Markdown** 专属写作空间。
极简设计，操作直观，**专注于写作本身**。
响应迅速，即开即用，**捕捉每一个灵感瞬间**。
隐私安全，本地存储，**所有数据全部存储于浏览器**。
完全开源，永久免费，**开启你的写作之旅**。

### 立即开始

**无需下载**，**无需注册**。
[访问官网](https://shnt.netlify.app)
，立即开始使用 SharpNote！

### 本地部署

让我们教你一步步完成 **SharpNote** 的本地部署。

#### 使用 Docker

```bash
# 克隆项目代码
git clone https://github.com/Coder-Lucas/sharp-note.git

# 进入项目目录
cd sharp-note

# 使用 Dockerfile 构建镜像
docker build -t sharp-note .

# 将容器的 3000 端口映射到本机的 3000 端口
docker run -d -p 3000:3000 sharp-note
```

#### 使用 nvm

```bash
# 安装 Node.js v22.22.3
nvm install 22.22.3

# 切换到 Node.js v22.22.3
nvm use 22.22.3

# 全局安装 pnpm v11.6.0
npm i -g pnpm@11.6.0

# 克隆项目代码
git clone https://github.com/Coder-Lucas/sharp-note.git

# 进入项目目录
cd sharp-note

# 安装项目依赖
pnpm i

# 构建生产环境
pnpm build

# 启动生产服务器
pnpm start
```

#### 使用 fnm

```bash
# 安装 Node.js v22.22.3
fnm install 22.22.3

# 切换到 Node.js v22.22.3
fnm use 22.22.3

# 全局安装 pnpm v11.6.0
npm i -g pnpm@11.6.0

# 克隆项目代码
git clone https://github.com/Coder-Lucas/sharp-note.git

# 进入项目目录
cd sharp-note

# 安装项目依赖
pnpm i

# 构建生产环境
pnpm build

# 启动生产服务器
pnpm start
```

#### 使用 Node.js v22.22.3

```bash
# 全局安装 pnpm v11.6.0
npm i -g pnpm@11.6.0

# 克隆项目代码
git clone https://github.com/Coder-Lucas/sharp-note.git

# 进入项目目录
cd sharp-note

# 安装项目依赖
pnpm i

# 构建生产环境
pnpm build

# 启动生产服务器
pnpm start
```

### 许可证

> 本应用遵循
> [The MIT License (MIT)](https://opensource.org/license/mit)

### 联系我们

> 联系邮箱:
> sharp-note.nag104@aleeas.com
> sharp-note.pox340@aleeas.com
> sharp-note.wok240@aleeas.com

## English

English Version of the **README** Doc.

### TOC

1. [SharpNote](#sharpnote)
    1. [中文](#中文)
        1. ...
    2. [English](#english)
        1. [TOC](#toc)
        2. [Project Description](#project-description)
        3. [Get Started](#get-started)
        4. [Local Deployment](#local-deployment)
            1. [Use Docker](#use-docker)
            2. [Use nvm](#use-nvm)
            3. [Use fnm](#use-fnm)
            4. [Use Node.js v22.22.3](#use-nodejs-v22220)
        5. [License](#license)
        6. [Contact Us](#contact-us)

### Project Description

**SharpNote**: your dedicated **Markdown** writing workspace.
Minimalist design, intuitive operation, **keep your focus solely on writing itself**.
Blazing-fast response, instant access, **never miss a spark of inspiration**.
Private & safe, local-first storage, **all data stored locally in your browser**.
100% open-source, permanently free, **start your writing journey today**.

### Get Started

**NO DOWNLOAD**, **NO SIGNUP**.
[Visit the official website](https://shnt.netlify.app)
, and start using SharpNote today!

### Local Deployment

Let's walk you step-by-step through the local deployment of SharpNote.

#### Use Docker

```bash
# Clone the repo
git clone https://github.com/Coder-Lucas/sharp-note.git

# Enter the project dir
cd sharp-note

# Build the image using Dockerfile
docker build -t sharp-note .

# Map container port 3000 to host port 3000
docker run -d -p 3000:3000 sharp-note
```

#### Use nvm

```bash
# Install Node.js v22.22.3
nvm install 22.22.3

# Switch to Node.js v22.22.3
nvm use 22.22.3

# Globally install pnpm v11.6.0
npm i -g pnpm@11.6.0

# Clone the repo
git clone https://github.com/Coder-Lucas/sharp-note.git

# Enter the project dir
cd sharp-note

# Install project dependencies
pnpm i

# Build for production
pnpm build

# Start the production server
pnpm start
```

#### Use fnm

```bash
# Install Node.js v22.22.3
fnm install 22.22.3

# Switch to Node.js v22.22.3
fnm use 22.22.3

# Globally install pnpm v11.6.0
npm i -g pnpm@11.6.0

# Clone the repo
git clone https://github.com/Coder-Lucas/sharp-note.git

# Enter the project dir
cd sharp-note

# Install project dependencies
pnpm i

# Build for production
pnpm build

# Start the production server
pnpm start
```

#### Use Node.js v22.22.3

```bash
# Globally install pnpm v11.6.0
npm i -g pnpm@11.6.0

# Clone the repo
git clone https://github.com/Coder-Lucas/sharp-note.git

# Enter the project dir
cd sharp-note

# Install project dependencies
pnpm i

# Build for production
pnpm build

# Start the production server
pnpm start
```

### License

> This app is licensed under
> [the MIT License (MIT)](https://opensource.org/license/mit)

### Contact Us

> Contact Email:
> sharp-note.nag104@aleeas.com
> sharp-note.pox340@aleeas.com
> sharp-note.wok240@aleeas.com
