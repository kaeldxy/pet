import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registe from '../views/Registe.vue'
import Info from '../views/Info.vue'
import GoodList from '../views/main/good/goodList.vue'
import PetList from '../views/main/pet/petList.vue'
import MyseverList from '../views/main/mysever/myseverList.vue'
import ShopList from '../views/main/shop/ShopList.vue'
import Content from '../views/main/Content.vue'
import { notification } from 'ant-design-vue'

import adminList from '../views/main/admin/adminList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/registe',
    name: 'Registe',
    component: Registe
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
    beforeEnter: (to, from, next) => {
      console.log(to, from);
      if (!window.localStorage['_k']) {
        notification.open({
          message: 'Unauthorized',
          description: '当前您没有权限访问，请登录',
        })
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: Content,
        children: [
          { path: 'list', name: 'adminList', component: adminList }
        ]
      },
      {
        path: 'good',
        name: 'good',
        component: Content,
        children: [
          { path: 'list', name: 'GoodList', component: GoodList },
        ]
      },
      {
        path: 'pet',
        name: 'pet',
        component: Content,
        children: [
          { path: 'list', name: 'PetList', component: PetList }
        ]
      },
      {
        path: 'shop',
        name: 'shop',
        component: Content,
        children: [
          { path: 'list', name: 'ShopList', component: ShopList }
        ]
      },
      {
        path: 'mysever',
        name: 'mysever',
        component: Content,
        children: [
          { path: 'list', name: 'MyseverList', component: MyseverList }
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
