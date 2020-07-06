import Servics from "../service/pet"
export default {
    namespaced: true,
    state: {
        limit: 5,
        page: 1,
        rows: [],
        count: 10
    },
    mutations: {
        getpets: (state, payload) => {
            state.rows = payload.rows
            state.count = payload.count
        },
    },
    actions: {
        petall: async (context, datsa) => {
            const limit = datsa.limit
            const page = datsa.page
            const data = await Servics.getpetsanys(limit, page)
            context.commit("getpets", data)
        },
        petadd: async (context, dates) => {
            const data = await Servics.addpetsanys(dates)
            return data
        },
        petupdata: async (context, datee) => {
            const data = await Servics.petupdatasanys(datee)
            return data
        },
        petUpload: async (context, formData) => {
            const data = await Servics.updatapetsanys(formData)
            return data
        },
        petdelet: async (context, uers) => {
            const data = await Servics.delettpetsanys(uers)
            return data
        }
    },

    modules: {}
}