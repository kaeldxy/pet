import Axios from "axios";


export default {
    get: ({ page, limit }) => Axios.get('/api/user/get', { params: { page, limit } }).then(res => res.data)
}