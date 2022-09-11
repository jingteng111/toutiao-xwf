<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="reFreshSuccessText"
    >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <ArticleItem
        v-for="(article,index) in list"
        :key="index"
        :article="article"
      />
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储类别数据
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表数据加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading
      reFreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶
        })
        const { results } = data.data
        // 展开数组
        this.list.push(...results)

        // 本次数据加载完成之后将加载状态设置为结束
        this.loading = false

        // 判断是否加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true
          this.finished = true
        }
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    // 下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 请求获取数据
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.reFreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.reFreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
	overflow-y: auto;
}
</style>