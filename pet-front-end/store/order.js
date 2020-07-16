import orderService from '../service/order.js'
export default {
	namespaced: true,	
	state: {
		orderList: [],
		total: 0,
		page: 1,
		limit: 12,
		status: ''
	},
	mutations: {
		pushList: (state, allData) => {
			state.orderList.push(...allData.orderList)
			state.total = allData.total,
			state.page++
		},
		initAndTog: (state, status) => {
			state.status = status
			state.page = 1
			state.limit = 12
			state.orderList.length = 0
			state.total = 0
		},
		delOrder: (state, _id) => Object.assign(state, {
			orderList: state.orderList.filter(item => item._id !== _id),
			total: state.total - 1
		})
	},
	actions: {
		getAllOrder: async ({state, rootState, commit}, type) => {
			const {page, limit, status} = state
			const userId = rootState.userInfo._id
		 	const all = await orderService.getAllOrder({page, limit: status ? limit : limit / 3, dependQuery: {userId, status}})
			const allData = {orderList: [], total: 0}
			for(const key in all){
				allData.orderList.push(...all[key].data)
				allData.total += all[key].total
			}
			commit('pushList', allData)
		},
		delOrder: async (ctx, {type, _id}) => {
			const res = await orderService.delOrder({type, _id})
			ctx.commit('delOrder', _id)
		},
		addOrder: async (ctx, {orders}) => {
			const res = await orderService.addOrder({orders})
			console.log(res)
		}
	}
}