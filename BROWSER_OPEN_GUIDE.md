# 如何在浏览器中打开项目

## 方式一：打开本地开发服务器（开发时使用）

### 步骤：

#### 1. 进入项目目录
```powershell
cd book-shop-platform
```

#### 2. 安装依赖（如果还没安装）
```powershell
npm install
```

#### 3. 启动开发服务器
```powershell
npm run dev
```

#### 4. 在浏览器中打开
启动成功后，终端会显示类似信息：
```
  VITE v2.8.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

**直接在浏览器中访问：**
- 打开浏览器
- 输入地址：`http://localhost:5173/`
- 或者直接点击终端中的链接（如果终端支持）

---

## 方式二：打开 GitHub 仓库页面

### 在浏览器中访问你的 GitHub 仓库：

1. **打开浏览器**
2. **访问仓库地址**：
   ```
   https://github.com/mmz-mm/edu-book-platform
   ```
3. **或者**：
   - 登录 GitHub
   - 点击右上角头像
   - 选择 "Your repositories"
   - 找到 `edu-book-platform` 仓库并点击

---

## 方式三：预览构建后的项目

如果你想预览生产构建版本：

```powershell
# 1. 构建项目
npm run build

# 2. 预览构建结果
npm run preview
```

然后访问终端显示的地址（通常是 `http://localhost:4173/`）

---

## 快速启动命令（复制粘贴）

```powershell
# 进入项目目录
cd book-shop-platform

# 启动开发服务器
npm run dev

# 然后在浏览器打开：http://localhost:5173/
```

---

## 常见问题

### Q: 端口被占用怎么办？

如果 5173 端口被占用，Vite 会自动使用下一个可用端口（如 5174）。

或者手动指定端口：
```powershell
# 修改 vite.config.js，添加：
server: {
  port: 3000,  // 使用 3000 端口
  open: true   // 自动在浏览器打开
}
```

### Q: 如何自动在浏览器中打开？

修改 `vite.config.js`：
```javascript
export default defineConfig({
  server: {
    open: true,  // 启动后自动打开浏览器
    port: 5173
  }
})
```

### Q: 如何让局域网内其他设备访问？

启动后，使用 Network 地址（如 `http://192.168.x.x:5173/`），
同一局域网内的其他设备可以通过这个地址访问。

### Q: 如何停止开发服务器？

在终端中按 `Ctrl + C`

---

## 推荐操作

**开发时**：使用 `npm run dev`，在浏览器打开 `http://localhost:5173/`

**查看 GitHub**：访问 `https://github.com/mmz-mm/edu-book-platform`
