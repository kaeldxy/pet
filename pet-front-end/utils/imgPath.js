import { baseURL } from '../service/baseURL.js'
export const imgBase = (src) => {
	return /http/.test(src) ? '' : baseURL + '/'
}
export const imgUrl = (src) => {
	return src.replace(/\\/g, '/')
}
