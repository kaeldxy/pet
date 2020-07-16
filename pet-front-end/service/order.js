import { baseURL } from './baseURL.js'
import Request from '../js_sdk/luch-request/luch-request/index.js'
const rp = new Request();
rp.interceptors.request.use(function(config) {
	const token = uni.getStorageSync('user_token')
	config.header.Authorization = `Bearer ${token}`
	return config;
}, function(error) {
	return Promise.reject(error);
})
export default {
	getAllOrder: condition => rp.get( `${baseURL}/order/get`,{params: condition}).then(res => res.data),
	delOrder: condition => rp.post(`${baseURL}/order/del`, condition).then(res => res.data),
	addOrder: ({orders}) => rp.post(`${baseURL}/order/add`, {orders}).then(res => res.data)
}
