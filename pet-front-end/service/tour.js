import { baseURL } from './baseURL.js'
export default {
	getGood: ({page, limit}) => uni.request({
		url: baseURL + '/tour/getGood',
		data: {page, limit},
	}).then(res => res[1].data),
	getMysever: ({page, limit}) => uni.request({
		url: baseURL + '/tour/getMysever',
		data: {page, limit},
	}).then(res => res[1].data),
	getPet: ({page, limit}) => uni.request({
		url: baseURL + '/tour/getPet',
		data: {page, limit},
	}).then(res => res[1].data),
	getItem: ({type, _id}) => uni.request({
		url: baseURL + '/tour/getItem',
		data: {type, _id}
	}).then(res => res[1].data),
	getByClassify: ({page = 1, limit = 12, condition}) => uni.request({
		url:`${baseURL}/tour/getByClassify`,
		data: {page, limit, condition}
	}).then(res => res[1].data)
}