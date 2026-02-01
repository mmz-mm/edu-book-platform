<template>
	<div class='container'>
		<section>
			<div class="register-box">
	            <!-- 注册表单 -->
	            <div class="register-form">
	                <ul class="nav nav-tabs">
	                    <li 
	                    	v-for='item in registerTxt'
	                    	:key='item.id'
	                    	class="nav-items"
	                    	:class='current==item.id?"actives":""'
	                    	@click='registerChange(item.id)'
	                    >
	                        <a :class='current==item.id?"activess":""'>{{ item.text }}</a>
	                    </li>
	                </ul>
	                <div class="tab-content">
	                    <div class="tab-pane fade show active" v-if='current==1'>
	                        <!-- 账号注册 -->
	                        <div class="tab-main">
	                        	<el-form
							        ref="ruleFormRef"
							        :model="ruleForm"
							        :rules="rules"
							    >
									<el-form-item class="login-user" prop="username">
									   <el-icon><avatar /></el-icon>
								       <el-input v-model="ruleForm.username" placeholder="请输入用户名(3-11位)"/>
								    </el-form-item>
								    <el-form-item class="login-password" prop="userpwd">
									   <el-icon><lock /></el-icon>
								       <el-input type='password' v-model="ruleForm.userpwd" placeholder="请输入密码(3-11位)"/>
								    </el-form-item>
								    <el-form-item class="login-password" prop="confirmPwd">
									   <el-icon><lock /></el-icon>
								       <el-input type='password' v-model="ruleForm.confirmPwd" placeholder="请再次输入密码"/>
								    </el-form-item>
								    <el-form-item class="login-submit">
								      <el-button type="primary" @click='userBtn(ruleFormRef)'>注册</el-button>
								    </el-form-item>
	                                <div class="login-text">
	                                    注册即同意相关服务条款和隐私政策 <a>《小鹿线用户服务协议》</a><a>《小鹿线隐私政策》</a>
	                                    已有账号？<router-link to="/login" class="register-link">去登录</router-link>
	                                </div>
	                            </el-form>
	                        </div>
	                    </div>
	                    <div class="tab-pane fade" v-else>
	                        <!-- 短信注册 -->
	                        <div class="tab-main">
	                        	<el-form
                                ref="ruleFormRefPhone"
                                :model="ruleFormPhone"
                                :rules="rulesPhone"
                            >
                                <el-form-item class="login-user" prop="phone">
                                   <el-icon><avatar /></el-icon>
                                   <el-input v-model='ruleFormPhone.phone' placeholder="请输入您的手机号"/>
                                </el-form-item>

                                <el-form-item class="login-Verification" prop="captcha">
                                   <el-input v-model='ruleFormPhone.captcha' placeholder="请输入您的验证码"/>
                                    <el-button @click='sendCode' class="btn btn-primary sendcaptcha" type="primary" :disabled="countdown > 0">{{ captcha }}</el-button>
                                </el-form-item>
                                <div class="login-submit">
                                    <el-button @click='phoneBtn(ruleFormRefPhone)' class="btn btn-primary sendcaptcha" type="primary">注册</el-button>
                                </div>
                                <div class="login-text">
                                    注册即同意相关服务条款和隐私政策 <a>《小鹿线用户服务协议》</a><a>《小鹿线隐私政策》</a>
                                    已有账号？<router-link to="/login" class="register-link">去登录</router-link>
                                </div>
                            </el-form>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		</section>
	</div>
   
</template>

<script setup lang="ts">
import { ref , reactive } from 'vue';
import { useRouter } from 'vue-router';
//element-ui
import { Avatar , Lock } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
//api
import { registerByJson , registerByMobile } from '../utils/api/register'
import { sendCaptcha } from '../utils/api/login'
//加密
import { Encrypt } from '../utils/aes'
//pinia
import { useUserStore } from '../store/user'
const userStore = useUserStore();
const router = useRouter();

//账号注册和短信注册切换
const current = ref<number>(1);
//账号注册和短信注册
const registerTxt = ref([
	{id:1,text:'账号注册'},
	{id:2,text:'短信注册'}
])
const registerChange = (id: number)=>{
	current.value = id;
}	
//账号密码注册
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	username:'',
	userpwd:'',
	confirmPwd:''
})
// 自定义密码确认验证
const validateConfirmPwd = (_rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== ruleForm.userpwd) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  username: [
  	{ required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3-11位用户名', trigger: 'blur' },
  ],
  userpwd:[
  	{ required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
  ],
  confirmPwd: [
  	{ required: true, message: '请再次输入密码', trigger: 'blur' },
  	{ validator: validateConfirmPwd, trigger: 'blur' }
  ]
});
//账号密码点击注册
const userBtn = (formEl: FormInstance | undefined) => {
	if (!formEl) return
 	formEl.validate((valid: boolean) => {
	    if (valid) {
			registerByJson({
				username:Encrypt(ruleForm.username),
				password:Encrypt(ruleForm.userpwd)
			}).then(res=>{
				//注册成功
				if( res.meta && res.meta.code!="10006" ){
					ElMessage({
					    showClose: true,
					    message: res.meta.msg || '注册失败',
					    type: 'error',
					})
					return;
				} 
				(ElMessage as any)({
				    showClose: true,
				    message: '注册成功',
				    type: 'success',
				})
				(userStore as ReturnType<typeof useUserStore>).setToken((res.data as any).accessToken);
				// 注册成功后跳转到首页
				setTimeout(() => {
					router.push('/');
				}, 1000);
			})
	    } else {
	      	ElMessage({
			    showClose: true,
			    message: '请输入正确格式',
			    type: 'warning',
			})
	    }
	})
}

//短信注册
const captcha = ref<string>('发送验证码');
const countdown = ref<number>(0);
const ruleFormRefPhone = ref<FormInstance>();
const ruleFormPhone = reactive({
    phone:'',
    captcha:''
})
const rulesPhone = reactive<FormRules>({
  phone: [
    {required: true,message: '请输入手机号',trigger: 'blur',},
    {pattern: /^1[3456789]\d{9}$/,message: '目前只支持中国大陆的手机号码',},
  ],
  captcha:[
    { required: true,message: '请输入验证码', trigger: 'blur',}
  ]
});

//发送验证码
const sendCode = () => {
    if (!ruleFormPhone.phone) {
        ElMessage({
            showClose: true,
            message: '请输入手机号',
            type: 'warning',
        })
        return;
    }
    // 验证手机号格式
    if (!/^1[3456789]\d{9}$/.test(ruleFormPhone.phone)) {
        ElMessage({
            showClose: true,
            message: '请输入正确的手机号格式',
            type: 'warning',
        })
        return;
    }
    sendCaptcha({ mobile: ruleFormPhone.phone }).then(res => {
        if (res.meta && res.meta.code === '10006') {
            ElMessage({
                showClose: true,
                message: '验证码发送成功，验证码为：123456',
                type: 'success',
            })
            // 倒计时
            countdown.value = 60;
            captcha.value = `${countdown.value}秒后重发`;
            const timer = setInterval(() => {
                countdown.value--;
                if (countdown.value > 0) {
                    captcha.value = `${countdown.value}秒后重发`;
                } else {
                    captcha.value = '发送验证码';
                    clearInterval(timer);
                }
            }, 1000);
        } else {
            ElMessage({
                showClose: true,
                message: res.meta?.msg || '验证码发送失败',
                type: 'error',
            })
        }
    }).catch(() => {
        ElMessage({
            showClose: true,
            message: '验证码发送失败',
            type: 'error',
        })
    })
}

//注册按钮
const phoneBtn = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: boolean) => {
        if (valid) {    
            //用户输入的手机号
            const mobile = Encrypt(ruleFormPhone.phone);
            //用户输入的验证码
            const captcha = ruleFormPhone.captcha;
            registerByMobile({ mobile, captcha }).then(res=>{
                //注册成功
                if( res.meta && res.meta.code!="10006" ){
                    ElMessage({
                        showClose: true,
                        message: res.meta.msg || '注册失败',
                        type: 'error',
                    })
                    return;
                }
                (ElMessage as any)({
                    showClose: true,
                    message: '注册成功',
                    type: 'success',
                })
                (userStore as ReturnType<typeof useUserStore>).setToken((res.data as any).accessToken);
                // 注册成功后跳转到首页
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            })
        } else {
            ElMessage({
                showClose: true,
                message: '请输入正确格式',
                type: 'warning',
            })
        }
    })
}
</script>

<style scoped>
.container{
	position: relative;
    width: 100vw;
    height: 100vh;
    background: url(../assets/img/loginbg.jpeg) no-repeat center;
}
section{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 10;
}
.register-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 800px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 5px #777;
}

.register-form{
    padding: 20px 50px;
    /* width: 100%; */
    background: #ffffff;
    box-shadow: 0 0 8px #cccccc;
    border-radius: 8px;
}

.nav-tabs {
    border-bottom: none;
}
.nav-tabs{
    display: flex;
    justify-content: space-between;
    text-align: center;
}
.nav-tabs li{
    width: 50%;
    padding: 0px 0;
    font-size: 17px;
    font-weight: bold;
}
.nav-tabs li a{
    color: #333;
    display: block;
    height: 45px;
    line-height: 45px;
}
.actives{
    color: #388eff;
    border-bottom: 4px solid #388eff;
}
.activess{
    color: #388eff !important;
}
.nav-tabs li a:hover{
    text-decoration: none;
}
.tab-main{
    height: 360px;
    padding: 1px 0 0 0;
}
.login-user{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #666;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.login-user i{
    font-size: 18px;
    color: #666;
    margin-left: 5px;
}
.login-user input{
    width: calc(100% - 30px);
    height: 35px;
    outline: none;
    color: #666666;
    border: 0;
    padding: 0 5px;
}
.login-password{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #666;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.login-password i{
    font-size: 18px;
    color: #666;
    margin-left: 5px;
}
.login-password input{
    width: calc(100% - 30px);
    height: 35px;
    outline: none;
    color: #666666;
    border: 0;
    padding: 0 5px;
}
.login-Verification{
    width: 100%;
    height: 40px;
    margin-top: 30px;
    border-bottom: 1px solid #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.login-Verification .captcha{
    width: 130px;
    height: 35px;
    outline: none;
    color: #666666;
    border: none;
}
.login-Verification .sendcaptcha{
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 20px;
}
.login-submit{
    width: 100%;
    height: 40px;
    margin-top: 30px;
    display: flex;
    align-items: center;
}
.login-submit button{
    width: 100%;
    height: 35px;
    outline: none;
    border: none;
    letter-spacing: 5px;
    border-radius: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}
.login-text{
    width: 100%;
    margin-top: 30px;
    color: #666;
    text-align: justify;
    font-size: 12px;
}
.register-link{
    color: #388eff;
    text-decoration: none;
    margin-left: 5px;
}
.register-link:hover{
    text-decoration: underline;
}
:deep .el-form-item__content{
	flex-wrap: nowrap;
}
:deep .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-input__inner {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-select {
  --el-select-input-focus-border-color: transparent;
}
:deep .el-form-item__error{
	top: 120%;
}
</style>
