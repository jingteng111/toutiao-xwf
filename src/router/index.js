import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import My from '@/views/my'
import Search from '@/views/search'
import Article from '@/views/article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: Home
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article,
    props: true
  }
]
const router = new VueRouter({
  routes
})

export default router
