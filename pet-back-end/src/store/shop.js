import shopServer from "../servers/shop.js";
export default {
  namespaced: true,
  state: {
    limit: 3,
    page: 1,
    count: 0,
    maxPage: 0,
    rows: [],
  },
  mutations: {
    getShop(state, payload) {
      Object.assign(state, {
        count: payload.count,
        maxPage: payload.maxPage,
        rows: [...payload.rows],
      });      
    },
    change(state,num){
        state.page=num
    }
  },
  getters: {
    data: state => state,
  },
  actions: {
    getShops: async ({ state, commit }) => {                
      const { limit, page } = state;
      const data = await shopServer.getShops({ page,limit  });      
      commit("getShop", data);
    },
  },
};
