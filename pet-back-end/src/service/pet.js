import axios from 'axios';
export default {
    getpetsanys: (limit, page) => axios.post('/api/pet/get', {
        limit: limit, page: page,
    })
        .then(Response => Response.data)
        .catch(function (error) {
            console.log(error);
        }),
    delettpetsanys: (uers) => axios.post('/api/pet/delet', {
        uers: uers
    })
        .then(Response => Response.data)
        .catch(function (error) {
            console.log(error);
        }),
    addpetsanys: (dates) => axios.post('/api/pet/add', {
        dates: dates
    })
        .then(Response => Response.data)
        .catch(function (error) {
            console.log(error);
        }),
    petupdatasanys: (datee) => axios.post('/api/pet/updata', {
        datee: datee
    })
        .then(Response => Response.data)
        .catch(function (error) {
            console.log(error);
        }),
    updatapetsanys: (formData) =>
        axios.post('/api/pet/upload', formData, {
            headers: {
                cache: false, //上传文件无需缓存
                contentType: false, //*** //数据的解析类型，不需要，我们上传2进制数据，没有类型
                processData: false, //*** //用于对data参数进行序列化处理 这里必须false
            }
        }).then(Response => Response.data)

}