/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
* 获取频道的文章列表
*/
export const getArticles = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})

/**
 * 根据 id 获取指定文章
 */
export const getArticleById = articleId => request({
  method: 'GET',
  url: `/v1_0/articles/${articleId}`
})

/**
 * 收藏文章
 */
export const addCollectArticle = target => request({
  method: 'POST',
  url: '/v1_0/article/collections',
  data: {
    target
  }
})

/**
 * 取消收藏文章
 */
export const deleteCollectArticle = target => request({
  method: 'DELETE',
  url: `/v1_0/article/collections/${target}`
})

/**
 * 点赞文章
 */
export const addLikeArticle = target => request({
  method: 'POST',
  url: '/v1_0/article/likings',
  data: {
    target
  }
})

/**
 * 取消点赞文章
 */
export const deleteLikeArticle = target => request({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`
})