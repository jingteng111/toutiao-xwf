import { login, sendSms, getUserInfo, getUserChannels } from '@/api/User'
import { getArticles } from '@/api/Article'
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/Channel'

// 用户登录
export const loginAPI = login
// 获取短信验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo
// 获取用户频道
export const getUserChannelsAPI = getUserChannels
// 加载文章列表数据
export const getArticlesAPI = getArticles
// 获取所有频道列表
export const getAllChannelsAPI = getAllChannels
// 添加用户频道
export const addUserChannelAPI = addUserChannel
// 删除用户指定频道
export const deleteUserChannelAPI = deleteUserChannel