import Axios from "axios";



export default {
    get: condition => Axios.get('/api/mysever/get', {params: condition}).then(res => res.data),
    del: _id => Axios.post('/api/mysever/del', {_id}).then(res => res.data)
}