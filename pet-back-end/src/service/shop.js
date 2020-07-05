import axios from 'axios';
const baseUrl = '/api'
export default {
  getShops: ({ page,limit=3  }) => 
  axios.post(`${baseUrl}/shop/findShop?limit=${limit}&page=${page}`)
  .then((response) =>  response.data)
  .catch((error) => console.log(error)),
};