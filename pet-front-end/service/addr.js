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
	getAddr: ({userId}) => rp.get(`${baseURL}/addr/get`, {params: {userId}}).then(res => res.data),
	addAddr: addData => rp.post(`${baseURL}/addr/add`, addData).then(res => res.data),
	updateAddr: updateData => rp.post(`${baseURL}/addr/update`, updateData).then(res => res.data),
}