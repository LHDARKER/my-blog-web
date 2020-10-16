import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import LoginIn from '@/views/LoginIn.vue'
import LoginReg from '@/views/LoginReg.vue'
import Content from '@/views/Content.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import Mine from '@/views/Mine.vue'
import ViewUI from 'view-design'

import 'view-design/dist/styles/iview.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueRouter)
Vue.use(ViewUI);

Vue.use(Router)
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'LoginIn',
    component: LoginIn
  },
  {
    path: '/register',
    name: 'LoginReg',
    component: LoginReg
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/mine',
    name: 'mine',
    component:Mine
  },
  {
    path: '/content',
    name: 'Content',
    component: Content
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router
