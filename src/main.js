import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import store from './store'

// 引入 mock（开发环境）
import './mock/login'
import './mock/register'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')