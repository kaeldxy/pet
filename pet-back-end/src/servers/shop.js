import axios from 'axios';

export default {
  getShops: ({ page,limit=3  }) => 
  //  axios
  // .post('/shop/findShop', {limit,page})
  // .then((response) => response.data)
  // .catch((error) => console.log(error)),
  
  
  axios.post(`/shop/findShop?limit=${limit}&page=${page}`)
  .then((response) =>  response.data)
  .catch((error) => console.log(error)),
};