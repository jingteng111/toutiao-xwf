<template>
  <div class="search-suggestion">
    <van-cell
     icon="search"
     v-for="(text, index) in suggestions"
     :key="index"
     :title="text"
     @click="$emit('search', text)"
    >
      <!-- <div slot="title" v-html="hightlight(text)"></div> -->
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议列表
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestionAPI(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
    // hightlight (text) {
    //   const hightlightStr = `<span class="active">${this.searchText}</span>`
    //   const reg = new RegExp(this.searchText, 'gi')
    //   return text.replace(reg, hightlightStr)
    // }
  },
  watch: {
    searchText: {
      // 当 searchText 发送改变的时候就会调用 handler 函数
      // handler (val) {
      //   this.loadSearchSuggestion(val)
      // },
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true // 立即侦听
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>