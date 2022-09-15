<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    @click="onLiked"
    :loading="loading"
  />
</template>

<script>
import { addLikeArticleAPI, deleteLikeArticleAPI } from '@/api'

export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLiked () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLikeArticleAPI(this.articleId)
        } else {
          // 没有点赞，添加点赞
          await addLikeArticleAPI(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)

        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>