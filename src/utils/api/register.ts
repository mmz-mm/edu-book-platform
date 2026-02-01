import request from './request'
import type { LoginByJsonData, LoginByMobileData, ApiResponse } from '@/types'

//账号密码注册
export function registerByJson(data: LoginByJsonData): Promise<ApiResponse> {
	return request({
		url:'/api/u/registerByJson',
		method:'post',
		data
	})
}

//手机验证码注册
export function registerByMobile(data: LoginByMobileData): Promise<ApiResponse> {
	return request({
		url:'/api/u/registerByMobile',
		method:'post',
		data
	})
}
