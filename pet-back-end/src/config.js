import Axios from 'axios'
import { notification } from 'ant-design-vue'

Axios.interceptors.request.use(function (config) {
    config.headers = { 'Authorization': `Bearer ${window.localStorage['_k']}` }
    return config;
});
Axios.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if (err.response.statusText === "Unauthorized") {
        notification.open({
            message: 'Unauthorized',
            description: '您的令牌已经失效，请重新登录',
        })
        window.location.hash = '/'
        window.localStorage.clear()
    }
    return { statusText: 'Unauthorized' }
});