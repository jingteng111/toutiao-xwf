<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult
    v-if="isResultShow"
    :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SerachHistory
      v-else
      :search-histories="searchHistories"
      @delHistory="delHistoryFn"
      @delAll="delAllFn"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SerachHistory from '@/views/search/components/search-history'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import SearchResult from '@/views/search/components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH-HISTORY') || [] // 搜索的历史记录数据
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    delHistoryFn (index) {
      this.searchHistories.splice(index, 1)
    },
    delAllFn () {
      this.searchHistories = []
    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH-HISTORY', val)
    }
  },
  components: {
    SerachHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>