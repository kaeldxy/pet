import axios from 'axios';
export default {
    get: obj => axios.get('/api/pet/get', { params: obj }).then(res => res.data),
    del: _id => axios.post('/api/pet/del', { _id }).then(res => res.data),
    add: addData => axios.post('/api/pet/add', addData).then(res => res.data),
    update: updateData => axios.post('/api/pet/update', updateData).then(res => res.data),
    upload: formData => axios.post('/api/pet/upload', formData, {
        headers: {
            cache: false, //上传文件无需缓存
            contentType: false, //*** //数据的解析类型，不需要，我们上传2进制数据，没有类型
            processData: false, //*** //用于对data参数进行序列化处理 这里必须false
        }
    }).then(res => res.data)

}