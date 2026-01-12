# 注册功能实现方案

## ✅ 已实现的方案：使用 Mock 数据（方案一）

### 实现说明

我已经为你实现了注册功能，使用的是 **Mock 数据方案**，无需修改后端接口。

### 实现内容

1. **创建了注册 API** (`src/utils/api/register.js`)
   - 提供 `register()` 函数调用注册接口

2. **配置了 Mock 拦截** (`src/utils/api/request.js`)
   - 在开发环境下自动拦截 `/api/u/register` 请求
   - 返回模拟的注册响应数据
   - 数据格式与登录接口保持一致

3. **更新了注册页面** (`src/views/Register.vue`)
   - 调用注册接口
   - 使用加密函数（与登录保持一致）
   - 处理成功/失败情况
   - 注册成功后跳转到登录页

### 如何使用

1. **启动开发服务器**：
   ```powershell
   npm run dev
   ```

2. **访问注册页面**：
   - 浏览器打开：`http://localhost:5173/register`
   - 或从登录页点击"去注册"链接

3. **测试注册**：
   - 输入用户名（3-20位）
   - 输入密码（6-20位）
   - 确认密码
   - 点击"注册"按钮

### Mock 数据说明

- **存储位置**：内存中（`mockUsers` 数组）
- **持久化**：❌ 刷新页面后数据会清空（仅用于开发测试）
- **验证规则**：
  - 用户名不能为空
  - 用户名不能重复（已注册的用户名会提示"用户名已存在"）
  - 密码不能为空

### 如何切换到真实后端

如果你想使用真实的后端接口，只需要修改 `src/utils/api/request.js`：

```javascript
// 将这一行改为 false
const USE_MOCK = false; // 改为 false 使用真实后端
```

---

## 方案二：使用真实后端接口

如果你的后端已经提供了注册接口，或者你想自己实现后端，可以按以下方式：

### 后端接口要求

接口地址：`POST /api/u/register`

**请求参数**（与登录接口格式一致）：
```json
{
  "username": "加密后的用户名",
  "password": "加密后的密码"
}
```

**响应格式**（与登录接口格式一致）：
```json
{
  "meta": {
    "code": "10006",  // 成功代码
    "msg": "注册成功，请登录"
  },
  "data": {
    "username": "用户名",
    "message": "注册成功"
  }
}
```

**错误响应示例**：
```json
{
  "meta": {
    "code": "10004",  // 错误代码
    "msg": "用户名已存在，请换一个"
  },
  "data": null
}
```

### 如何修改后端（如果你有后端代码）

#### 如果使用 Node.js + Express：

```javascript
// routes/user.js
router.post('/u/register', async (req, res) => {
  const { username, password } = req.body;
  
  // 1. 解密数据（使用与前端相同的密钥）
  const decryptedUsername = decrypt(username);
  const decryptedPassword = decrypt(password);
  
  // 2. 验证数据
  if (!decryptedUsername || !decryptedPassword) {
    return res.json({
      meta: {
        code: '10001',
        msg: '用户名和密码不能为空'
      },
      data: null
    });
  }
  
  // 3. 检查用户名是否已存在
  const existingUser = await User.findOne({ username: decryptedUsername });
  if (existingUser) {
    return res.json({
      meta: {
        code: '10004',
        msg: '用户名已存在，请换一个'
      },
      data: null
    });
  }
  
  // 4. 创建新用户
  const newUser = new User({
    username: decryptedUsername,
    password: hashPassword(decryptedPassword) // 密码应该加密存储
  });
  
  await newUser.save();
  
  // 5. 返回成功
  res.json({
    meta: {
      code: '10006',
      msg: '注册成功，请登录'
    },
    data: {
      username: decryptedUsername,
      message: '注册成功'
    }
  });
});
```

#### 如果使用 Java Spring Boot：

```java
@PostMapping("/api/u/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    // 1. 解密数据
    String username = AESUtil.decrypt(request.getUsername());
    String password = AESUtil.decrypt(request.getPassword());
    
    // 2. 验证数据
    if (username == null || password == null) {
        return ResponseEntity.ok(new ApiResponse("10001", "用户名和密码不能为空", null));
    }
    
    // 3. 检查用户名是否已存在
    if (userService.existsByUsername(username)) {
        return ResponseEntity.ok(new ApiResponse("10004", "用户名已存在，请换一个", null));
    }
    
    // 4. 创建新用户
    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    userService.save(user);
    
    // 5. 返回成功
    return ResponseEntity.ok(new ApiResponse("10006", "注册成功，请登录", 
        new RegisterData(username, "注册成功")));
}
```

#### 如果使用 Python Django：

```python
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username_encrypted = data.get('username')
        password_encrypted = data.get('password')
        
        # 1. 解密数据
        username = decrypt(username_encrypted)
        password = decrypt(password_encrypted)
        
        # 2. 验证数据
        if not username or not password:
            return JsonResponse({
                'meta': {'code': '10001', 'msg': '用户名和密码不能为空'},
                'data': None
            })
        
        # 3. 检查用户名是否已存在
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                'meta': {'code': '10004', 'msg': '用户名已存在，请换一个'},
                'data': None
            })
        
        # 4. 创建新用户
        user = User.objects.create_user(
            username=username,
            password=password
        )
        
        # 5. 返回成功
        return JsonResponse({
            'meta': {'code': '10006', 'msg': '注册成功，请登录'},
            'data': {'username': username, 'message': '注册成功'}
        })
```

### 解密函数（后端需要实现）

前端使用的加密密钥：
- **Key**: `AOWQ4P0YEC4YXUKS`
- **IV**: `O3V2GCL1K2HNZ9Y7`
- **算法**: AES-CBC-PKCS7

后端需要使用相同的密钥进行解密。

---

## 方案三：使用 vite-plugin-mock（高级方案）

如果你想使用更专业的 Mock 工具，可以安装 `vite-plugin-mock`：

### 安装

```powershell
npm install -D vite-plugin-mock mockjs
```

### 配置

修改 `vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'src/mock', // mock 文件目录
      enable: true, // 是否启用
    })
  ],
  // ... 其他配置
})
```

### 创建 Mock 文件

`src/mock/register.js`（已创建）：

```javascript
export default [
  {
    url: '/api/u/register',
    method: 'post',
    response: ({ body }) => {
      // ... Mock 逻辑
    }
  }
]
```

---

## 测试注册功能

### 测试步骤

1. **启动项目**：
   ```powershell
   npm run dev
   ```

2. **访问注册页面**：
   - 直接访问：`http://localhost:5173/register`
   - 或从登录页点击"去注册"

3. **测试场景**：
   - ✅ 正常注册：输入有效的用户名和密码
   - ❌ 用户名已存在：使用已注册的用户名
   - ❌ 密码太短：输入少于6位的密码
   - ❌ 用户名太短：输入少于3位的用户名
   - ❌ 密码不一致：两次输入的密码不同

### 预期结果

- **注册成功**：显示"注册成功，请登录"，1秒后跳转到登录页
- **注册失败**：显示错误提示信息（如"用户名已存在"）

---

## 常见问题

### Q1: Mock 数据在哪里存储？

A: 当前实现存储在内存中（`request.js` 的 `mockUsers` 数组），刷新页面后会清空。如果需要持久化，可以：
- 使用 `localStorage` 存储
- 使用真实后端接口
- 使用数据库（需要后端支持）

### Q2: 如何让注册后自动登录？

A: 修改 `Register.vue` 的 `onRegister` 函数，注册成功后调用登录接口并保存 token：

```javascript
register({...}).then(res => {
  if (res.meta.code === '10006') {
    // 注册成功后自动登录
    loginByJson({
      username: Encrypt(form.username),
      password: Encrypt(form.password)
    }).then(loginRes => {
      if (loginRes.meta.code === '10006') {
        userStore.setToken(loginRes.data.accessToken);
        router.push({ path: '/' }); // 跳转到首页
      }
    });
  }
});
```

### Q3: 如何添加更多验证规则？

A: 在 `Register.vue` 的 `rules` 中添加：

```javascript
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '请输入3-20位用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
  ],
  // ...
}
```

### Q4: 如何添加邮箱注册？

A: 
1. 在表单中添加邮箱输入框
2. 在 `register.js` 中添加邮箱参数
3. 在后端或 Mock 中添加邮箱验证逻辑

---

## 总结

✅ **当前实现**：使用 Mock 数据，无需后端支持，可以直接测试注册功能

🔧 **切换到真实后端**：只需将 `USE_MOCK` 改为 `false`

📝 **代码位置**：
- 注册 API：`src/utils/api/register.js`
- Mock 逻辑：`src/utils/api/request.js`
- 注册页面：`src/views/Register.vue`

现在你可以测试注册功能了！🎉
