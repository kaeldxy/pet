import axios from 'axios';
const baseUrl = '/api';
export default {
    get: condition =>axios.get(`${baseUrl}/related/get`, { params: condition}).then(res => res.data).catch((error) => console.log(error)),
    getAdmins: condition =>axios.get(`${baseUrl}/test/getAdmin`, { params: condition}).then(res => res.data).catch((error) => console.log(error)),
   
};