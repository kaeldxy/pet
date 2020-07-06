import axios from 'axios';
const baseUrl = '/api';
export default {
  getShops: condition => axios.get(`${baseUrl}/shop/findShop`, { params: condition})
    .then((response) => response.data)
    .catch((error) => console.log(error)),
  addShops: (obj) => axios.post(`${baseUrl}/shop/addShop`, obj)
    .then((response) => response.data)
    .catch((error) => console.log(error)),
  updataShop: (obj) => axios.post(`${baseUrl}/shop/updataShop`, obj)
    .then((response) => response.data)
    .catch((error) => console.log(error)),
    
  getAll: condition => axios.get(`${baseUrl}/shop/findShop/all`, { params: condition})
    .then((response) => response.data)
    .catch((error) => console.log(error)),
};