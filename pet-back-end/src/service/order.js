import Axios from "axios";

export default {
    get: condition => Axios.get('/api/order/get', {params: condition}).then(res => res.data)
}