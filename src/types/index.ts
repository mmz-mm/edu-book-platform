// API 响应类型
export interface ApiResponse<T = any> {
  meta?: {
    code: string | number
    msg?: string
    message?: string
  }
  code?: number
  data: T
  message?: string
}

// 请求配置类型
export interface RequestConfig {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  data?: any
  params?: any
  headers?: Record<string, string>
}

// 用户相关类型
export interface UserInfo {
  token: string
  [key: string]: any
}

// 课程类型
export type CourseType = 1 | 2 | 3 // 1: 初级, 2: 中级, 3: 高级

// 登录相关类型
export interface LoginByJsonData {
  username: string
  password: string
}

export interface LoginByMobileData {
  mobile: string
  captcha: string
}

export interface SendCaptchaParams {
  mobile: string
  type?: string
}

// 课程相关类型
export interface Course {
  id: string
  courseName: string
  courseCover: string
  courseLevel: number
  courseLevelText?: string
  purchaseCounter: number
  purchaseCnt: number
  discountPrice: number
  isMember?: number
}

// 分类相关类型
export interface Category {
  id: string
  categoryName: string
}

// 课程难度类型
export interface CourseLevel {
  id?: string
  text: string
  code: string
}
