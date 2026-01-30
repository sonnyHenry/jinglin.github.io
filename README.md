# Jing Lin - Academic Personal Website

个人学术网站 | Personal Academic Website

## 🎯 快速编辑内容

**所有网站内容都在 `data.json` 文件中！** 只需编辑这一个文件即可更新整个网站。

```bash
# 编辑内容
open data.json   # 或用任意编辑器打开
```

`data.json` 包含：
- `profile` - 姓名、职位、机构、邮箱
- `about` - 个人简介
- `links` - 社交/学术链接
- `research` - 研究方向和关键词
- `publications` - 发表物列表
- `contact` - 联系信息

---

## 本地预览

```bash
cd /Users/sonny/AntiGravityProjects/profile
python3 -m http.server 8000
```

打开浏览器访问：http://localhost:8000

---

## 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 仓库名填写 `your-username.github.io`（替换为你的用户名）
   - 例如：`jinglin.github.io`
4. 选择 **Public**
5. 点击 `Create repository`

### 第二步：上传网站文件

在终端运行：

```bash
cd /Users/sonny/AntiGravityProjects/profile

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: academic website"

# 添加远程仓库（替换 YOUR-USERNAME）
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git

# 推送
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 进入仓库设置 `Settings` → `Pages`
2. Source 选择 `main` 分支
3. 点击 `Save`
4. 等待几分钟，访问 `https://YOUR-USERNAME.github.io`

---

## 绑定自定义域名

### 第一步：购买域名

推荐注册商：
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - 成本价
- [Namecheap](https://www.namecheap.com/) - 常有优惠
- [Google Domains](https://domains.google/)

### 第二步：配置 DNS

在域名注册商的 DNS 设置中添加：

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

### 第三步：配置 GitHub

1. 编辑 `CNAME` 文件，将内容改为你的域名（如 `jinglin.com`）
2. 提交并推送更改
3. 在仓库 `Settings` → `Pages` → `Custom domain` 填入你的域名
4. 勾选 `Enforce HTTPS`

---

## 更新内容

### 修改个人信息
编辑 `index.html` 中的相关内容

### 添加发表物
编辑 `publications.html`，按照现有格式添加新条目

### 更新研究方向
编辑 `research.html`，修改研究卡片内容

### 更换头像
1. 将照片放入 `assets/images/` 目录
2. 重命名为 `profile.jpg`（或修改 `index.html` 中的路径）

---

## 文件结构

```
profile/
├── index.html          # 首页
├── research.html       # 研究方向
├── publications.html   # 发表物
├── contact.html        # 联系方式
├── css/
│   └── style.css       # 样式
├── js/
│   └── main.js         # 交互脚本
├── assets/
│   └── images/         # 图片
├── CNAME               # 自定义域名
└── README.md           # 本文件
```

---

## 许可证

© 2026 Jing Lin. All rights reserved.
