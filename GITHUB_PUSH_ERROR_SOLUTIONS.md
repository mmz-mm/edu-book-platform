# GitHub 推送错误解决方案

## 错误信息
```
fatal: unable to access 'https://github.com/mmz-mm/edu-book-platform.git/': 
Recv failure: Connection was reset
```

这是一个网络连接问题，常见于中国大陆访问 GitHub 时。

---

## 解决方案（按推荐顺序）

### 方案 1：检查并重试（最简单）

网络问题可能是临时的，先尝试：

```powershell
# 重试推送
git push -u origin master
```

如果还是失败，尝试多次重试，或者等待几分钟后再试。

---

### 方案 2：使用 SSH 方式（推荐，更稳定）

SSH 方式通常比 HTTPS 更稳定。

#### 步骤 1：检查是否已有 SSH 密钥

```powershell
# 检查是否存在 SSH 密钥
ls ~/.ssh

# 如果看到 id_rsa 和 id_rsa.pub（或 id_ed25519），说明已有密钥
# 如果没有，需要生成
```

#### 步骤 2：生成 SSH 密钥（如果没有）

```powershell
# 生成 SSH 密钥（替换为你的 GitHub 邮箱）
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"

# 按 Enter 使用默认路径
# 设置密码（可选，直接 Enter 跳过）
```

#### 步骤 3：复制公钥

```powershell
# 查看公钥内容
cat ~/.ssh/id_ed25519.pub

# 或者
type ~/.ssh/id_ed25519.pub
```

**复制输出的整个内容**（从 `ssh-ed25519` 开始到邮箱结束）

#### 步骤 4：添加到 GitHub

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单选择 **SSH and GPG keys**
4. 点击 **New SSH key**
5. Title: 填写描述（如：My Windows PC）
6. Key: 粘贴刚才复制的公钥
7. 点击 **Add SSH key**

#### 步骤 5：测试 SSH 连接

```powershell
# 测试 SSH 连接
ssh -T git@github.com

# 如果看到 "Hi mmz-mm! You've successfully authenticated..." 说明成功
```

#### 步骤 6：修改远程仓库地址为 SSH

```powershell
cd book-shop-platform

# 查看当前远程地址
git remote -v

# 修改为 SSH 地址
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git

# 验证修改
git remote -v
```

#### 步骤 7：重新推送

```powershell
git push -u origin master
```

---

### 方案 3：配置 Git 代理（如果使用代理）

如果你使用 VPN 或代理软件（如 Clash、V2Ray 等）：

#### 设置 HTTP 代理

```powershell
# 设置 HTTP 代理（替换为你的代理地址和端口）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 常见代理端口：
# Clash: 7890
# V2Ray: 10809
# 其他: 查看你的代理软件设置
```

#### 设置 SSH 代理（如果使用 SSH）

编辑 `~/.ssh/config` 文件（如果不存在则创建）：

```powershell
# 创建或编辑配置文件
notepad ~/.ssh/config
```

添加以下内容：

```
Host github.com
    HostName github.com
    User git
    ProxyCommand connect -S 127.0.0.1:7890 %h %p
```

#### 取消代理（如果不再需要）

```powershell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

### 方案 4：使用 GitHub Desktop（图形化工具）

如果命令行一直失败，可以使用图形化工具：

1. 下载 [GitHub Desktop](https://desktop.github.com/)
2. 登录 GitHub 账户
3. 添加本地仓库
4. 点击 Push 按钮推送

---

### 方案 5：增加缓冲区大小（网络较慢时）

```powershell
# 增加 HTTP 缓冲区大小
git config --global http.postBuffer 524288000

# 设置超时时间
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

---

### 方案 6：使用 GitHub 镜像或加速（临时方案）

**注意：不推荐用于正式项目，仅用于学习测试**

可以使用一些 GitHub 镜像服务，但安全性较低。

---

## 快速诊断命令

```powershell
# 1. 检查网络连接
ping github.com

# 2. 检查远程仓库地址
git remote -v

# 3. 检查 Git 配置
git config --list | Select-String "proxy"
git config --list | Select-String "user"

# 4. 测试 HTTPS 连接
curl -I https://github.com

# 5. 测试 SSH 连接（如果使用 SSH）
ssh -T git@github.com
```

---

## 推荐方案总结

### 对于中国大陆用户：

1. **首选：使用 SSH 方式**（方案 2）
   - 更稳定
   - 不需要每次输入密码（配置好后）
   - 适合长期使用

2. **备选：配置代理**（方案 3）
   - 如果你已有代理软件
   - 只需配置一次

3. **临时：重试**（方案 1）
   - 网络临时问题时有用
   - 不稳定

---

## 完整操作流程（SSH 方式推荐）

```powershell
# 1. 进入项目目录
cd book-shop-platform

# 2. 检查是否已有 SSH 密钥
ls ~/.ssh

# 3. 如果没有，生成 SSH 密钥
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"

# 4. 查看并复制公钥
type ~/.ssh/id_ed25519.pub

# 5. 将公钥添加到 GitHub（在网页上操作）

# 6. 测试 SSH 连接
ssh -T git@github.com

# 7. 修改远程地址为 SSH
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git

# 8. 推送代码
git push -u origin master
```

---

## 常见问题

### Q: SSH 方式还是 HTTPS 方式好？

**SSH 方式**：
- ✅ 更稳定
- ✅ 配置后不需要输入密码
- ✅ 适合开发使用

**HTTPS 方式**：
- ✅ 设置简单
- ❌ 可能需要代理
- ❌ 每次推送需要输入密码（或使用 token）

**推荐使用 SSH 方式。**

### Q: 如何查看我的代理端口？

- Clash: 通常 7890
- V2Ray: 通常 10809
- 查看代理软件的设置/系统代理端口

### Q: 推送时要求输入用户名密码？

如果是 HTTPS 方式：
- 用户名：你的 GitHub 用户名
- 密码：需要使用 **Personal Access Token**（不是账户密码）

获取 Token：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. 选择权限（至少需要 `repo`）
4. 复制 token，用作密码

---

## 验证是否成功

推送成功后，你会看到类似信息：

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Delta compression using up to X threads
Compressing objects: 100% (X/X), done.
Writing objects: 100% (X/X), X.XX KiB | X.XX MiB/s, done.
Total X (delta X), reused X (delta X), pack-reused X
remote: Resolving deltas: 100% (X/X), completed with X local objects.
To https://github.com/mmz-mm/edu-book-platform.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

然后在 GitHub 网页上刷新，就能看到你的代码了！🎉
