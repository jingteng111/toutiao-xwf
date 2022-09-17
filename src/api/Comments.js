/**
 * 评论请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章评论列表
 */

export const getComments = params => request({
  method: 'GET',
  url: '/v1_0/comments',
  params
})

/**
 * 评论点赞
 */
export const addLikeComments = target => request({
  method: 'POST',
  url: '/v1_0/comment/likings',
  data: {
    target
  }
})

/**
 * 评论点赞
 */
export const deleteLikeComments = target => request({
  method: 'DELETE',
  url: `/v1_0/comment/likings/${target}`
})