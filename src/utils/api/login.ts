import request from './request'
import type { LoginByJsonData, LoginByMobileData, SendCaptchaParams, ApiResponse } from '@/types'

//用户名密码登录
export function loginByJson(data: LoginByJsonData): Promise<ApiResponse> {
	return request({
		url:'/api/u/loginByJson',
		method:'post',
		data
	})
}

//发送注册或登录验证码
export function sendCaptcha(params: SendCaptchaParams): Promise<ApiResponse> {
	return request({
		url:'/api/sms/sendRegisterOrLoginCaptcha',
		params
	})
}

//手机验证码登录
export function loginByMobile(data: LoginByMobileData): Promise<ApiResponse> {
	return request({
		url:'/api/u/loginByMobile',
		method:'post',
		data
	})
}
