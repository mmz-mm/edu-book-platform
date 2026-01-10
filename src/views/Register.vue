<template>
  <div class="register-container">
    <section>
      <div class="register-box">
        <div class="register-form">
          <h2>注册新账号</h2>
          <el-form ref="formRef" :model="form" :rules="rules" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item prop="confirm">
              <el-input type="password" v-model="form.confirm" placeholder="确认密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onRegister">注册</el-button>
              <el-button type="text" @click="goLogin">已有账号，去登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const formRef = ref(null)
const form = reactive(
    { 
        username: '', 
        password: '', 
        confirm: ''
 })

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '请输入3-20位用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '请输入6-20位密码', trigger: 'blur' }
  ],
  confirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value) => value === form.password, message: '两次输入不一致', trigger: 'blur' }
  ]
}

const onRegister = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (!valid) return
    // 这里可以调用注册接口。当前实现为模拟注册成功，跳转到登录页。
    ElMessage({ type: 'success', message: '注册成功，请登录' })
    router.push({ path: '/login' })
  })
}

const goLogin = () => router.push({ path: '/login' })
</script>

<style scoped>
.register-container{ position: relative; width:100vw; height:100vh; background: #f5f7fa; }
section{ position:absolute; left:0; top:0; width:100%; height:100%; display:flex; justify-content:center; align-items:center }
.register-box{ width:420px; }
.register-form{ background:#fff; padding:30px; border-radius:8px; box-shadow:0 2px 12px rgba(0,0,0,0.08) }
.register-form h2{ margin: 0 0 20px 0; font-weight:600 }
</style>
