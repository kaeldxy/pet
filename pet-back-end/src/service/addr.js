import Axios from "axios";


export default {
    get: ({ userId }) => Axios.get('/api/addr/get', { params: { userId } }).then(res => res.data)
}
