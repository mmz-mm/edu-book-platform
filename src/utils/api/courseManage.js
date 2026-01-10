 import request from './request'
   
//获取一级分类
export function getFirstCategorys() {
    return request({
        url: '/api/course/category/getFirstCategorys',
    })
}
//获取二级分类
export function getSecondCategorys( params ){
	return request({
		url:'/api/course/category/getSecondCategorys',
		params
	})
}

 //查询课程标签
export function tagsList(data){
    return request({
        url:'/api/course/tags/list',   
        method: 'post',
        data
    })
}
//查询课程
export function searchCourse( data ){
	return request({
		url:'/api/course/search',
		method:'post',
		data
	})
}
//图片轮播
export function getSliders(){   //
	return request({
		url:'/api/slider/getSliders',   //获取图片轮播
	})
}

//查询最新课程
export function newCourse(data){
    return request({
        url:'/api/course/mostNew',   //获取最新课程
        method: 'post',
        data
    })
}

//获取网站配置
export function setting(){
	return request({
		url:'/api/setting/get',
	})
}
