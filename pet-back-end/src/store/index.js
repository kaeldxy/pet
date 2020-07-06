import Vue from "vue";
import Vuex from "vuex";
import shop from "./shop";
import pet from "./pet";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAdmin: {name: '', position: '', account: '', _id: ''},
    keyWords:{
      list: '数据列表',
      add: '新增',
      update: '更新',
      detail: '详情页',
      order: '订单',
      admin: '管理员',
      pet: '宠物',
      shop: '门店',
      mysever: '服务',
      good: '商品',
      user: '用户',
    }

  },
  mutations: {
    toggleCurrentAdmin: (state, payload) => Object.assign(state.currentAdmin, payload)
  },
  actions: {
  },
  modules: { shop, pet}
})
