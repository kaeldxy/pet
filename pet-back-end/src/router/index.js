import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registe from '../views/Registe.vue'
import Info from '../views/Info.vue'
import GoodList from '../views/main/good/goodList.vue'
import PetList from '../views/main/pet/petList.vue'
import MyseverList from '../views/main/mysever/myseverList.vue'
import ShopList from '../views/main/shop/shopList.vue'
import Content from '../views/main/content.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Registe',
    name: 'Registe',
    component: Registe
  },
  {
    path: '/info',
    name: 'info',
    component: Info,
    children: [
      {
        path: 'good',
        name: 'goodmain',
        component: Content,
        children: [
          { path: 'list', name: 'goodList', component: GoodList },
        ]
      },
      {
        path: 'pet',
        name: 'petmain',
        component: Content,
        children: [
          { path: 'list', name: 'petList', component: PetList }
        ]
      },
      {
        path: 'shop',
        name: 'shopmain',
        component: Content,
        children: [
          { path: 'list', name: 'shopList', component: ShopList }
        ]
      },
      {
        path: 'mysever',
        name: 'mysevermain',
        component: Content,
        children: [
          { path: 'list', name: 'myseverList', component: MyseverList }
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
