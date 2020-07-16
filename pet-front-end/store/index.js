import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../service/user.js'
import order from './order.js'
import addr from './addr.js'
import car from './car.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		switchLoginState: (state, data) => Object.assign(state, {userInfo: data.userInfo, hasLogin: data.statu}),
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
		userLogin: async (ctx, params) => {
			const res = await userService.login(params)
			const { statu, msg } = res
			if(statu){
				const { userInfo, statu, token } = res
				uni.setStorage({
				    key: 'userInfo',  
				    data: userInfo  
				})
				uni.setStorage({
				    key: 'user_token',  
				    data: token  
				})
				ctx.commit('switchLoginState', {userInfo, statu})
			}
			return {statu, msg}
		}
	},
	modules:{
		order, addr, car
	}
})

export default store
