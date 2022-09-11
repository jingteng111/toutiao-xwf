import { login, sendSms } from '@/api/User.js'

// 用户登录
export const loginAPI = login
// 获取短信验证码
export const sendSmsAPI = sendSms