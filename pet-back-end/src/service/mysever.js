import Axios from "axios";



export default {
    get: condition => Axios.get('/api/mysever/get', {params: condition}).then(res => res.data),
    del: _id => Axios.post('/api/mysever/del', {_id}).then(res => res.data),
    update: updateData => Axios.post('/api/mysever/update', updateData).then(res => res.data),
    add: addData => Axios.post('/api/mysever/add', addData).then(res => res.data)
}