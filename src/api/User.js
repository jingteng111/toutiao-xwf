/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

/**
 * 获取短信验证码
 */
export const sendSms = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})
