import Vue from "vue";
import Vuex from "vuex";
import shop from "./shop";
Vue.use(Vuex);

export default new Vuex.Store({
<<<<<<< HEAD
  state: {},
  mutations: {},
  actions: {},
  modules: { shop },
});
=======
  state: {
    currentAdmin: {name: '', position: '', account: ''}
  },
  mutations: {
    toggleCurrentAdmin: (state, payload) => Object.assign(state.currentAdmin, payload)
  },
  actions: {
  },
  modules: {
  }
})
>>>>>>> b6fcaa6f2bb0b0f63893a53447c0cba1ba5c495a
