# GitHub 推送问题快速解决方案

## 当前问题：网络连接重置
```
fatal: unable to access 'https://github.com/mmz-mm/edu-book-platform.git/': 
Recv failure: Connection was reset
```

这是网络连接问题，常见于中国大陆访问 GitHub。

---

## 🚀 最快解决方案（推荐）

### 方案 A：使用 SSH 方式（最稳定，推荐）

SSH 方式通常比 HTTPS 更稳定，特别是在网络受限的环境下。

#### 快速操作步骤：

```powershell
# 1. 检查是否已有 SSH 密钥
ls ~/.ssh

# 如果没有 id_ed25519 或 id_rsa，生成新的：
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"
# 直接按 Enter 三次（使用默认路径，不设密码）

# 2. 查看公钥并复制
type ~/.ssh/id_ed25519.pub
# 复制输出的全部内容

# 3. 在 GitHub 网页上添加 SSH 公钥：
#    - 登录 GitHub (mmz-mm 账户)
#    - Settings → SSH and GPG keys → New SSH key
#    - 粘贴公钥，保存

# 4. 测试连接
ssh -T git@github.com
# 输入 yes 确认

# 5. 切换到 SSH 地址
cd book-shop-platform
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git

# 6. 推送
git push -u origin master
```

---

### 方案 B：配置代理（如果你有 VPN/代理软件）

如果你使用 Clash、V2Ray 等代理软件：

```powershell
# 查看你的代理端口（通常在代理软件设置中）
# Clash 默认：7890
# V2Ray 默认：10809

# 配置 Git 使用代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 然后重试推送
cd book-shop-platform
git push -u origin master

# 如果不再需要代理，取消设置：
# git config --global --unset http.proxy
# git config --global --unset https.proxy
```

---

### 方案 C：增加缓冲区大小并重试

```powershell
cd book-shop-platform

# 增加缓冲区
git config --global http.postBuffer 524288000

# 设置超时
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 重试推送
git push -u origin master
```

---

### 方案 D：使用 GitHub Desktop（图形化工具）

如果命令行一直失败：

1. 下载 [GitHub Desktop](https://desktop.github.com/)
2. 使用 `mmz-mm` 账户登录
3. File → Add Local Repository
4. 选择 `book-shop-platform` 文件夹
5. 点击 Push origin

---

## ✅ 推荐操作顺序

1. **先试方案 A（SSH）** - 最稳定，一次配置永久使用
2. 如果有代理 → 方案 B
3. 都没有 → 方案 C 或 D

---

## 📝 SSH 方式完整命令（复制粘贴）

```powershell
# 进入项目目录
cd book-shop-platform

# 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"
# 按 Enter 三次

# 查看公钥（复制全部输出）
type ~/.ssh/id_ed25519.pub

# 在 GitHub 添加 SSH 公钥后，测试连接
ssh -T git@github.com

# 切换到 SSH 地址
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git

# 推送
git push -u origin master
```

---

## 🔍 检查当前远程地址

```powershell
cd book-shop-platform
git remote -v
```

如果显示 `https://`，可以改为 SSH：
```powershell
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git
```
