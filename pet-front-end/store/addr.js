import addrService from '../service/addr.js'
export default {
	namespaced: true,	
	state: {
		addrList: [],
	},
	mutations: {
		assignList: (state, data) => Object.assign(state, data)
	},
	actions: {
		getAddrs:async ({rootState, commit}) => {
			const userId = rootState.userInfo._id
			const {addrs: addrList} = await addrService.getAddr({userId})
			commit('assignList', { addrList })
		},
		addAddr:async ({rootState, commit}, addData) => {
			const userId = rootState.userInfo._id
			Object.assign(addData, {userId})
			const {statu, msg} = await addrService.addAddr(addData)
			return {statu, msg}
		},
		updateAddr: async ({rootState, commit}, updateData) => {
			const {statu, msg} = await addrService.updateAddr(updateData)
			return {statu, msg}
		}
	}
}