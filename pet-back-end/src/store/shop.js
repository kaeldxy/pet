import shopServer from "../service/shop.js";

export default {
  namespaced: true,
  state: {
    count: 0,
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
  },
  actions: {
    getShops: async ({ commit, rootState }, {page = 1, limit = 6}) => {
      const { _id: adminId, position } = rootState.currentAdmin
      let data;
      if (position === 'plat') {
        data = await shopServer.getShops({ page, limit })
      } else {
        data = await shopServer.getShops({ page, limit, adminId });
      }
      commit("getShop", data);
    },
    addShop: async (context, payload) => {
      await shopServer.addShops(payload);
    },
    updataShop: async (context, payload) => {
      await shopServer.updataShop(payload);
    },
  },
};
