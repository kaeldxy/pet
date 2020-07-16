import { baseURL } from './baseURL.js'

export default {
	login: data => uni.request({
		url: `${baseURL}/user/login`,
		data,
		method: 'POST'
	}).then(res => res[1].data),
	checkUser: token => uni.request({
		url: `${baseURL}/user/check`,
		method:'POST',
		header: {
			Authorization: `Bearer ${token}`
		}
	}).then(res => res[1])
}