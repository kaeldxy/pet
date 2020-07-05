import axios from 'axios';
const baseUrl = '/api';
export default {
  getShops: ({ page,limit=3  }) => axios.get(`${baseUrl}/shop/findShop?limit=${limit}&page=${page}`)
  .then((response) =>  response.data)
  .catch((error) => console.log(error)),
  addShops: (obj) => axios.post(`${baseUrl}/shop/addShop?`,obj)
  .then((response) =>  response.data)
  .catch((error) => console.log(error)),
  updataShop:(obj) => axios.post(`${baseUrl}/shop/updataShop?`,obj)
  .then((response) =>  response.data)
  .catch((error) => console.log(error)),
};