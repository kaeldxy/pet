import petServics from "../service/pet"
export default {
    namespaced: true,
    state: {
        rows: [],
        count: 0
    },
    mutations: {
        assign: (state, payload) => Object.assign(state, payload),
        delOneItem: (state, _id) => Object.assign(state, { rows: state.rows.filter(item => item._id !== _id) })
    },
    actions: {
        getPets: async (context, { page, limit }) => {
            const adminId = context.rootState.currentAdmin._id
            const data = await petServics.get({ limit, page, adminId })
            context.commit("assign", data)
        },
        addPet: async (context, addData) => await petServics.add(addData),

        updatePet: async (context, updateData) => await petServics.update(updateData),

        uploadPetImg: async (context, formData) => await petServics.upload(formData),

        delPet: async (context, _id) => {
            const { statu, msg } = await petServics.del(_id)
            if (statu) {
                context.commit('delOneItem', _id)
            }
            return msg
        }
    },

    modules: {}
}