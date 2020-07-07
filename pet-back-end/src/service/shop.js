import axios from 'axios';
const baseUrl = '/api';
export default {
  getShops: condition => axios.get(`${baseUrl}/shop/findShop`, { params: condition}).then((response) => response.data).catch((error) => console.log(error)),

  addShops: (obj) => axios.post(`${baseUrl}/shop/addShop`, obj).then((response) => response.data).catch((error) => console.log(error)),
  
  updataShop: (obj) => axios.post(`${baseUrl}/shop/updataShop`, obj).then((response) => response.data).catch((error) => console.log(error)),
    
  delShop: condition => axios.get(`${baseUrl}/shop/delShop/`, { params: condition}).then((response) => response.data).catch((error) => console.log(error)),

  upload: formData => axios.post('/api/shop/upload', formData, {
    headers: {
        cache: false, //上传文件无需缓存
        contentType: false, //*** //数据的解析类型，不需要，我们上传2进制数据，没有类型
        processData: false, //*** //用于对data参数进行序列化处理 这里必须false
    }
}).then(res => res.data)
};