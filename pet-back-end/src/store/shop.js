import shopServer from "../service/shop.js";

export default {
  namespaced: true,
  state: {
    count: 0,
    rows: [],
  },
  mutations: {
    assign: (state, payload) =>  Object.assign(state, payload)
  },
  actions: {
    getShops: async ({ commit, rootState }, payload) => {
      let data; 
      const position = rootState.currentAdmin.position
      if (position === 'plat') {
        data = await shopServer.getShops(payload)
      } else {
        const { _id: adminId } = rootState.currentAdmin
        const {page, limit} = payload
        data = await shopServer.getShops({ page, limit, adminId });
      }      
      commit("assign", data);
    },
    delShop: async (context, payload) => await shopServer.delShop(payload),
  },
};
