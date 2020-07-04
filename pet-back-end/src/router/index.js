import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registe from '../views/Registe.vue'
import Info from '../views/Info.vue'

import adminAdd from '../views/main/admin/adminAdd.vue'
import adminUpdate from '../views/main/admin/adminUpdate.vue'
import adminList from '../views/main/admin/adminList.vue'

import GoodAdd from '../views/main/good/goodAdd.vue'
import GoodUpdate from '../views/main/good/goodUpdate.vue'
import GoodList from '../views/main/good/goodList.vue'

import ShopAdd from '../views/main/shop/shopAdd.vue'
import ShopUpdate from '../views/main/shop/shopUpdate.vue'
import ShopList from '../views/main/shop/shopList.vue'

import PetAdd from '../views/main/pet/petAdd.vue'
import PetUpdate from '../views/main/pet/petUpdate.vue'
import PetList from '../views/main/pet/petList.vue'

import MyseverAdd from '../views/main/mysever/myseverAdd.vue'
import MyseverUpdate from '../views/main/mysever/myseverUpdate.vue'
import MyseverList from '../views/main/mysever/myseverList.vue'


import userList from '../views/main/user/userList.vue'

import Content from '../views/main/content.vue'


import { notification } from 'ant-design-vue'
 

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
        path: 'user',
        name: 'user',
        component: Content,
        children: [
          {path: 'list', name: 'userList', component: userList}
        ]
      },
      {
        path: 'admin',
        name: 'admin',
        component: Content,
        children: [
          { path: 'list', name: 'adminList', component: adminList },
          { path: 'add', name: 'adminAdd', component: adminAdd },
          { path: 'update', name: 'adminUpdate', component: adminUpdate },
        ]
      },
      {
        path: 'good',
        name: 'good',
        component: Content,
        children: [
          { path: 'list', name: 'GoodList', component: GoodList },
          { path: 'add', name: 'GoodAdd', component: GoodAdd },
          { path: 'update', name: 'GoodUpdate', component: GoodUpdate },
        ]
      },
      {
        path: 'pet',
        name: 'pet',
        component: Content,
        children: [
          { path: 'list', name: 'PetList', component: PetList },
          { path: 'add', name: 'PetAdd', component: PetAdd },
          { path: 'update', name: 'PetUpdate', component: PetUpdate },
        ]
      },
      {
        path: 'shop',
        name: 'shop',
        component: Content,
        children: [
          { path: 'list', name: 'ShopList', component: ShopList },
          { path: 'add', name: 'ShopAdd', component: ShopAdd },
          { path: 'update', name: 'ShopUpdate', component: ShopUpdate },
        ]
      },
      {
        path: 'mysever',
        name: 'mysever',
        component: Content,
        children: [
          { path: 'list', name: 'MyseverList', component: MyseverList },
          { path: 'add', name: 'MyseverAdd', component: MyseverAdd },
          { path: 'update', name: 'MyseverUpdate', component: MyseverUpdate },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
