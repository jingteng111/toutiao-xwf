<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error="error"
      error-text="加载失败，请点击重试"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResultAPI({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText// 搜索关键字
        })
        // console.log(data)

        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>

</style>