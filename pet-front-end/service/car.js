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
	getCar: ({userId, page, limit}) => rp.get(`${baseURL}/car/get`, {params: {userId, page, limit}}).then(res => res.data),
	addCar: addData => rp.post(`${baseURL}/car/add`, addData).then(res => res.data),
	clear: ({userId}) => rp.post(`${baseURL}/car/clear`, {userId}).then(res => res.data),
	del: ({type, _id}) => rp.post(`${baseURL}/car/del`, {type, userId}).then(res => res.data)
}