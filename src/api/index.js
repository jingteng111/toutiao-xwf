import { login, sendSms, getUserInfo } from '@/api/User.js'

// 用户登录
export const loginAPI = login
// 获取短信验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo