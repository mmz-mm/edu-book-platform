# GitHub 权限错误解决方案（403 Permission Denied）

## 当前错误
```
remote: Permission to mmz-mm/edu-book-platform.git denied to mm1203.
fatal: unable to access 'https://github.com/mmz-mm/edu-book-platform.git/': 
The requested URL returned error: 403
```

## 问题分析
- **仓库所有者**：`mmz-mm`
- **当前认证用户**：`mm1203`（错误的凭据）
- **原因**：Windows 凭据管理器中保存了错误的 GitHub 账户信息

---

## 解决方案

### 方案 1：清除旧凭据并重新认证（推荐，HTTPS方式）

#### 步骤 1：清除 Windows 凭据管理器中的 GitHub 凭据

```powershell
# 方法 A：使用命令行清除（推荐）
cmdkey /delete:LegacyGeneric:target=git:https://github.com

# 方法 B：手动清除
# 1. 打开"控制面板" → "凭据管理器"
# 2. 选择"Windows 凭据"
# 3. 找到 "git:https://github.com"
# 4. 点击"删除"
```

#### 步骤 2：使用正确的 GitHub 账户推送

再次推送时，Git 会提示输入用户名和密码：

```powershell
cd book-shop-platform
git push -u origin master
```

**重要提示：**
- **用户名**：输入 `mmz-mm`（仓库所有者）
- **密码**：**不能使用账户密码**，需要使用 **Personal Access Token**

#### 步骤 3：创建 Personal Access Token

1. 登录 GitHub（使用 `mmz-mm` 账户）
2. 点击右上角头像 → **Settings**
3. 左侧菜单选择 **Developer settings**
4. 选择 **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token** → **Generate new token (classic)**
6. 填写信息：
   - **Note**：填写描述（如：Windows Git Push）
   - **Expiration**：选择有效期（建议选择合适的时间）
   - **Select scopes**：至少勾选 `repo`（全部仓库权限）
7. 点击 **Generate token**
8. **立即复制 token**（只显示一次！）

#### 步骤 4：使用 Token 推送

```powershell
git push -u origin master

# 提示输入用户名时：输入 mmz-mm
# 提示输入密码时：粘贴刚才复制的 token（不是账户密码！）
```

Token 会被保存到凭据管理器，以后就不需要再输入了。

---

### 方案 2：使用 SSH 方式（最推荐，最安全）

SSH 方式不需要输入密码，配置一次后永久使用。

#### 步骤 1：检查是否已有 SSH 密钥

```powershell
ls ~/.ssh
# 或
dir $env:USERPROFILE\.ssh
```

如果看到 `id_rsa` 和 `id_rsa.pub`（或 `id_ed25519`），说明已有密钥。

#### 步骤 2：生成 SSH 密钥（如果没有）

```powershell
# 生成 SSH 密钥（使用你的邮箱）
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"

# 按 Enter 使用默认路径（C:\Users\你的用户名\.ssh\id_ed25519）
# 设置密码（可选，直接 Enter 跳过）
# 再次确认密码
```

#### 步骤 3：查看并复制公钥

```powershell
# 查看公钥内容
type ~/.ssh/id_ed25519.pub

# 或者
cat ~/.ssh/id_ed25519.pub
```

**复制输出的整个内容**（从 `ssh-ed25519` 开始到邮箱结束）

#### 步骤 4：将公钥添加到 GitHub

1. 登录 GitHub（使用 `mmz-mm` 账户）
2. 点击右上角头像 → **Settings**
3. 左侧菜单选择 **SSH and GPG keys**
4. 点击 **New SSH key**
5. 填写信息：
   - **Title**：填写描述（如：My Windows PC）
   - **Key**：粘贴刚才复制的公钥内容
6. 点击 **Add SSH key**

#### 步骤 5：测试 SSH 连接

```powershell
# 测试连接
ssh -T git@github.com

# 如果看到 "Hi mmz-mm! You've successfully authenticated..." 说明成功
# 如果提示 "Are you sure you want to continue connecting? (yes/no)"，输入 yes
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

#### 步骤 7：推送代码（不需要输入密码）

```powershell
git push -u origin master
```

---

### 方案 3：使用 GitHub Desktop（图形化工具）

如果命令行一直有问题，可以使用图形化工具：

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 使用 `mmz-mm` 账户登录
3. 添加本地仓库：File → Add Local Repository
4. 选择 `book-shop-platform` 目录
5. 点击 Push origin 按钮

---

## 快速修复命令（方案1 - HTTPS + Token）

```powershell
# 1. 清除旧凭据
cmdkey /delete:LegacyGeneric:target=git:https://github.com

# 2. 进入项目目录
cd book-shop-platform

# 3. 尝试推送（会提示输入用户名和密码）
git push -u origin master

# 用户名：mmz-mm
# 密码：使用 Personal Access Token（不是账户密码）
```

---

## 完整操作流程（SSH方式 - 推荐）

```powershell
# 1. 清除旧凭据（如果使用 HTTPS）
cmdkey /delete:LegacyGeneric:target=git:https://github.com

# 2. 进入项目目录
cd book-shop-platform

# 3. 检查 SSH 密钥
ls ~/.ssh

# 4. 如果没有密钥，生成新的
ssh-keygen -t ed25519 -C "b22130910@njupt.edu.cn"
# （按 Enter 使用默认路径和空密码）

# 5. 查看并复制公钥
type ~/.ssh/id_ed25519.pub

# 6. 在 GitHub 网页上添加 SSH 公钥（Settings → SSH and GPG keys）

# 7. 测试 SSH 连接
ssh -T git@github.com

# 8. 修改远程地址为 SSH
git remote set-url origin git@github.com:mmz-mm/edu-book-platform.git

# 9. 推送代码
git push -u origin master
```

---

## 验证账户是否匹配

确保 Git 配置和 GitHub 账户一致：

```powershell
# 查看 Git 配置
git config --global user.name
git config --global user.email

# 如果需要修改（如果当前是 mm1203 的配置）
git config --global user.name "mmz-mm"
git config --global user.email "你的GitHub邮箱"
```

**注意**：Git 配置的用户名和邮箱不会影响推送权限，真正影响的是 Windows 凭据管理器中的凭据或 SSH 密钥对应的 GitHub 账户。

---

## 常见问题

### Q1: 为什么不能用账户密码？

GitHub 从 2021年8月13日开始，不再支持使用账户密码进行 Git 操作，必须使用：
- **Personal Access Token**（HTTPS 方式）
- **SSH 密钥**（SSH 方式）

### Q2: Token 和 SSH 密钥哪个好？

**SSH 密钥**：
- ✅ 配置一次，永久使用
- ✅ 不需要每次输入
- ✅ 更安全
- ✅ **推荐使用**

**Personal Access Token**：
- ✅ 设置简单
- ❌ 需要定期更新（如果设置了过期时间）
- ❌ 需要输入（首次）

### Q3: 如何查看当前使用的是哪个账户？

```powershell
# 查看 Windows 凭据管理器中的 GitHub 凭据
cmdkey /list | Select-String "github"

# 或者测试 SSH 连接（如果使用 SSH）
ssh -T git@github.com
```

### Q4: Token 过期了怎么办？

1. 重新生成 Token（GitHub → Settings → Developer settings → Personal access tokens）
2. 清除旧凭据：`cmdkey /delete:LegacyGeneric:target=git:https://github.com`
3. 重新推送，输入新的 Token

---

## 推荐方案总结

**最推荐：使用 SSH 方式**
- 配置一次，永久使用
- 不需要输入密码
- 更安全稳定

**备选：使用 HTTPS + Personal Access Token**
- 设置简单
- 但需要定期更新 Token（如果设置了过期）

立即开始使用 SSH 方式吧！🚀
