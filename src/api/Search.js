/**
 * 搜索接口模块
 */
import request from '@/utils/request'

/**
 * 搜索联想建议
 */
export const getSearchSuggestion = q => request({
  method: 'GET',
  url: '/v1_0/suggestion',
  params: {
    q
  }
})

/**
 * 搜索结果
 */
export const getSearchResult = params => request({
  method: 'GET',
  url: '/v1_0/search',
  params
})
