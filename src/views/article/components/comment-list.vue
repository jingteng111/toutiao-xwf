<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      :immediate-check="false"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in clist"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from '@/views/article/components/comment-item'

export default {
  name: 'CommentList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10, // 获取评论个数
      error: false
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    clist: {
      type: Array
    },
    type: {
      type: String,
      // 自定义 prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  methods: {
    async onLoad () {
      try {
        // 获取数据
        const { data } = await getCommentsAPI({
          type: this.type, // 评论类型
          source: this.source, // 文章id或评论id
          offset: this.offset, // 获取下一页数据的标记
          limit: this.limit // 获取评论个数
        })

        // 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        this.$emit('post-list', this.list)
        this.list = this.clist
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 将 loading 设置为 false
        this.loading = false

        // 判断是否有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  components: {
    CommentItem
  }
}
</script>

<style>

</style>