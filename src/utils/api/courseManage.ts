import request from './request'
import type { ApiResponse } from '@/types'

//获取一级分类
export function getFirstCategorys(): Promise<ApiResponse> {
    return request({
        url: '/api/course/category/getFirstCategorys',
    })
}

//获取二级分类
export function getSecondCategorys(params: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/category/getSecondCategorys',
		params
	})
}

//查询课程标签
export function tagsList(data: Record<string, any>): Promise<ApiResponse> {
    return request({
        url:'/api/course/tags/list',   
        method: 'post',
        data
    })
}

//查询课程
export function searchCourse(data: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/search',
		method:'post',
		data
	})
}

//图片轮播
export function getSliders(): Promise<ApiResponse> {
	return request({
		url:'/api/slider/getSliders',   //获取图片轮播
	})
}

//查询最新课程
export function newCourse(data: Record<string, any>): Promise<ApiResponse> {
    return request({
        url:'/api/course/mostNew',   //获取最新课程
        method: 'post',
        data
    })
}

//获取网站配置
export function setting(): Promise<ApiResponse> {
	return request({
		url:'/api/setting/get',
	})
}

//课程详情
export function getCourseDetail(params: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/getDetail',
		method:'get',
		params
	})
}

//检查是否有权限
export function courseCheckAuth(params: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/checkAuth',
		params
	})
}

//下载课程资料
export function downloadAttachment(params: Record<string, any>): Promise<Blob> {
	return request({
		url:'/api/course/downloadAttachment',
		params,
		responseType: 'blob',
	}) as unknown as Promise<Blob>
}

//播放课程
export function player(params: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/player/play',
		params
	})
}

//记录播放历史
export function recordHistory(data: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/history/recordHistory',
		method:'post',
		data,
	})
}

//最后一次记录
export function getLastHistoryByChapterId(params: Record<string, any>): Promise<ApiResponse> {
	return request({
		url:'/api/course/history/getLastHistoryByChapterId',
		params,
	})
}
