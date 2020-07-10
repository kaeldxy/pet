import Axios from "axios";

export default {
    getPetOrderData: () => Axios.get('/api/statistic/petOrderData').then(res => res.data),
    getGoodOrderData: () => Axios.get('/api/statistic/goodOrderData').then(res => res.data),
    getMyseverOrderData: () => Axios.get('/api/statistic/myseverOrderData').then(res => res.data),
}