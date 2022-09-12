/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

/**
 * 用户登录
 */
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

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
})

/**
 * 获取频道列表
 */
export const getUserChannels = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})

/**
 * 添加关注
 */
export const addFollow = userId => request({
  method: 'POST',
  url: '/v1_0/user/followings',
  data: {
    target: userId
  }
})

/**
 * 取消关注
 */
export const deleteFollow = userId => request({
  method: 'DELETE',
  url: `/v1_0/user/followings/${userId}`
})
