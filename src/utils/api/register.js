import request from './request'


//账号密码注册
export function registerByJson( data ){
	return request({
		url:'/api/u/registerByJson',
		method:'post',
		data
	})
}

//手机验证码注册
export function registerByMobile( data ){
	return request({
		url:'/api/u/registerByMobile',
		method:'post',
		data
	})
}