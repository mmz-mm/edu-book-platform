# GitHub 项目管理完整指南

## 一、准备工作

### 1.1 安装 Git
- Windows: 下载并安装 [Git for Windows](https://git-scm.com/download/win)
- 安装完成后，打开 Git Bash 或命令行工具
- 验证安装：`git --version`

### 1.2 配置 Git（首次使用需要）
```bash
# 配置用户名（替换为你的GitHub用户名）
git config --global user.name "你的用户名"

# 配置邮箱（替换为你的GitHub邮箱）
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

### 1.3 创建 GitHub 账户
1. 访问 [GitHub官网](https://github.com)
2. 点击 "Sign up" 注册账户
3. 验证邮箱并完成注册

---

## 二、创建 GitHub 仓库

### 方法一：在 GitHub 网站上创建（推荐）

1. **登录 GitHub**
   - 访问 https://github.com 并登录

2. **创建新仓库**
   - 点击右上角的 "+" 号，选择 "New repository"
   - 填写仓库信息：
     - **Repository name**: `book-shop-platform`（或你喜欢的名字）
     - **Description**: 可选，填写项目描述
     - **Visibility**: 选择 Public（公开）或 Private（私有）
     - **不要勾选** "Initialize this repository with a README"（因为本地已有项目）
     - **不要选择** License 和 .gitignore（本地已有）
   - 点击 "Create repository"

3. **获取仓库地址**
   - 创建成功后，GitHub 会显示仓库地址
   - 格式：`https://github.com/用户名/仓库名.git`
   - 或：`git@github.com:用户名/仓库名.git`（SSH方式）

### 方法二：使用 GitHub CLI（高级用法）
```bash
# 安装 GitHub CLI 后
gh repo create book-shop-platform --public
```

---

## 三、将本地项目连接到 GitHub

### 3.1 检查 Git 状态
```bash
# 进入项目目录
cd book-shop-platform

# 查看 Git 状态
git status
```

### 3.2 如果还未初始化 Git 仓库（本项目已初始化）
```bash
# 初始化 Git 仓库（如果还没有）
git init
```

### 3.3 添加远程仓库
```bash
# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 查看远程仓库
git remote -v
```

### 3.4 如果远程仓库已存在，更新地址
```bash
# 查看当前远程仓库
git remote -v

# 如果地址不对，可以修改
git remote set-url origin https://github.com/你的用户名/仓库名.git
```

---

## 四、首次推送代码到 GitHub

### 4.1 添加文件到暂存区
```bash
# 添加所有文件（.gitignore 中已排除 node_modules 等）
git add .

# 或者选择性添加
git add src/
git add package.json
git add README.md
```

### 4.2 提交更改
```bash
# 提交代码（首次提交）
git commit -m "Initial commit: 在线购书平台项目"

# 提交信息规范示例：
# git commit -m "feat: 添加用户登录功能"
# git commit -m "fix: 修复购物车bug"
# git commit -m "docs: 更新README文档"
```

### 4.3 推送到 GitHub
```bash
# 推送到主分支（首次推送）
git push -u origin master

# 如果默认分支是 main，使用：
git push -u origin main

# 如果遇到分支名不匹配的问题，可以重命名本地分支：
# git branch -M main
# git push -u origin main
```

---

## 五、日常开发流程

### 5.1 标准工作流程
```bash
# 1. 查看当前状态
git status

# 2. 查看更改内容
git diff

# 3. 添加更改的文件
git add .                    # 添加所有更改
git add 文件名                # 添加特定文件
git add src/views/Login.vue  # 添加特定文件

# 4. 提交更改
git commit -m "描述性的提交信息"

# 5. 推送到 GitHub
git push
```

### 5.2 提交信息规范（推荐）
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整（不影响代码逻辑）
refactor: 代码重构
test: 测试相关
chore: 构建/工具链相关
```

示例：
```bash
git commit -m "feat: 添加商品搜索功能"
git commit -m "fix: 修复购物车数量计算错误"
git commit -m "docs: 更新API文档"
```

---

## 六、分支管理（推荐使用）

### 6.1 创建和切换分支
```bash
# 创建新分支
git branch feature/user-profile

# 切换到新分支
git checkout feature/user-profile

# 创建并切换到新分支（一步完成）
git checkout -b feature/user-profile

# 或使用新命令（Git 2.23+）
git switch -c feature/user-profile
```

### 6.2 分支操作
```bash
# 查看所有分支
git branch

# 查看远程分支
git branch -r

# 查看所有分支（包括远程）
git branch -a

# 切换回主分支
git checkout master
# 或
git switch master

# 删除分支（需在其他分支上）
git branch -d feature/old-feature
```

### 6.3 合并分支
```bash
# 切换到主分支
git checkout master

# 拉取最新代码
git pull

# 合并功能分支
git merge feature/user-profile

# 推送合并后的代码
git push
```

---

## 七、常用 Git 命令

### 7.1 查看信息
```bash
# 查看提交历史
git log

# 查看简化的提交历史
git log --oneline

# 查看文件更改历史
git log --follow -- 文件名

# 查看某个文件的更改
git diff 文件名
```

### 7.2 撤销操作
```bash
# 撤销工作区的更改（未add）
git checkout -- 文件名

# 撤销暂存区的更改（已add但未commit）
git reset HEAD 文件名

# 撤销最后一次提交（保留更改）
git reset --soft HEAD~1

# 撤销最后一次提交（不保留更改）
git reset --hard HEAD~1
```

### 7.3 远程操作
```bash
# 拉取远程更新
git pull

# 获取远程更新（不合并）
git fetch

# 查看远程仓库信息
git remote show origin

# 删除远程分支
git push origin --delete 分支名
```

---

## 八、GitHub 高级功能

### 8.1 Pull Request（PR）
1. 在 GitHub 上创建新分支
2. 在分支上提交更改
3. 点击 "Compare & pull request"
4. 填写 PR 描述
5. 等待审查和合并

### 8.2 Issues（问题跟踪）
- 用于记录 bug、功能需求等
- 可以在代码中引用：`#123`（Issue编号）

### 8.3 GitHub Actions（CI/CD）
- 自动化测试和部署
- 配置文件：`.github/workflows/`

### 8.4 GitHub Pages（静态网站托管）
- Settings → Pages → 选择分支和文件夹
- 自动部署静态网站

---

## 九、团队协作

### 9.1 克隆项目
```bash
# 克隆远程仓库
git clone https://github.com/用户名/仓库名.git

# 克隆到指定目录
git clone https://github.com/用户名/仓库名.git 目录名
```

### 9.2 同步代码
```bash
# 拉取最新代码
git pull

# 如果有冲突，解决冲突后：
git add .
git commit -m "解决合并冲突"
git push
```

### 9.3 Fork 和贡献
1. Fork 别人的项目
2. Clone 你的 Fork
3. 创建新分支进行修改
4. 提交并推送到你的 Fork
5. 在原始仓库创建 Pull Request

---

## 十、常见问题解决

### 10.1 推送被拒绝
```bash
# 先拉取远程更新
git pull origin master

# 如果有冲突，解决冲突后：
git add .
git commit -m "合并远程更改"
git push
```

### 10.2 忘记添加 .gitignore
```bash
# 从 Git 中移除已跟踪的文件（但保留本地文件）
git rm -r --cached node_modules
git commit -m "从Git中移除node_modules"
```

### 10.3 修改最后一次提交信息
```bash
git commit --amend -m "新的提交信息"
git push --force  # 谨慎使用，特别是团队项目
```

### 10.4 撤销已推送的提交
```bash
# 创建新提交来撤销更改（推荐）
git revert HEAD
git push

# 或者重置（不推荐，会改变历史）
git reset --hard HEAD~1
git push --force
```

---

## 十一、快速参考清单

### 首次设置
- [ ] 安装 Git
- [ ] 配置用户名和邮箱
- [ ] 创建 GitHub 账户
- [ ] 在 GitHub 创建仓库
- [ ] 本地初始化 Git（如果需要）
- [ ] 添加远程仓库地址
- [ ] 提交并推送代码

### 日常开发
- [ ] `git status` - 查看状态
- [ ] `git add .` - 添加更改
- [ ] `git commit -m "描述"` - 提交更改
- [ ] `git push` - 推送到 GitHub
- [ ] `git pull` - 拉取更新

---

## 十二、最佳实践

1. **频繁提交**：小步快跑，经常提交
2. **清晰的提交信息**：使用规范化的提交信息格式
3. **使用分支**：为新功能创建独立分支
4. **定期同步**：每天开始工作前先 `git pull`
5. **不要提交敏感信息**：API密钥、密码等
6. **使用 .gitignore**：排除不需要版本控制的文件
7. **代码审查**：使用 Pull Request 进行代码审查
8. **备份重要数据**：GitHub 是备份，但不应该唯一备份

---

## 快速开始命令（本项目）

假设你已经在 GitHub 创建了名为 `book-shop-platform` 的仓库：

```bash
# 进入项目目录
cd book-shop-platform

# 添加远程仓库（替换为你的GitHub用户名和仓库名）
git remote add origin https://github.com/你的用户名/book-shop-platform.git

# 查看远程仓库
git remote -v

# 检查状态
git status

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 在线购书平台项目"

# 推送到GitHub（根据你的默认分支名选择master或main）
git branch -M main  # 如果需要重命名分支
git push -u origin main
```

完成以上步骤后，你的项目就已经在 GitHub 上了！
