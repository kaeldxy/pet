import Axios from 'axios'
const baseUrl = '/api'
export default {
    reg: data => Axios.post(`${baseUrl}/admin/reg`, data).then(res => res.data),
    login: data => Axios.post(`${baseUrl}/admin/login`, data).then(res => res.data),
    get: ({page, limit, position}) => Axios.get(`${baseUrl}/admin/get`, {params: {page, limit, position}}).then(res => res.data),
    del: _id => Axios.post(`${baseUrl}/admin/del`, {_id}).then(res => res.data)
}