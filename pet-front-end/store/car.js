import carService from '../service/car.js'
export default {
	namespaced: true,	
	state: {
		cars: []
	},
	mutations: {
		pushCars: (state, {cars}) => {
			cars.forEach(item => {
				item.checked = false
				item.num = 1
				state.cars.push(item)
			})
		},
		unshift: (state, resData) => {
			state.cars.unshift({...resData, num: 1, checked: false})
		},
		clear: (state) => state.cars.length = 0,
		del: (state, _id) => Object.assign(state, {cars: state.cars.filter(item => item._id !== _id)})
	},
	actions: {
		getCar:async ({rootState, commit}) => {
			const { _id: userId } = rootState.userInfo
			const res = await carService.getCar({userId})
			commit('pushCars', res)
		},
		addCar: async ({commit, rootState}, addData) => {
			const userId = rootState.userInfo._id
			Object.assign(addData, {userId})
			const resData = await carService.addCar(addData)
			commit('unshift', resData)
		},
		clear: async ({rootState, commit}) => {
			const userId = rootState.userInfo._id
			const res = await carService.clear({userId})
			console.log(res)
			commit('clear')
		},
		del: async ({commit}, {_id, type}) => {
			const res = await carService.del({_id, type})
			console.log(res)
			commit('del', _id)
		}
	}
}