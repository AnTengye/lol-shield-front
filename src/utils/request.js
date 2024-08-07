import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_BACK_URL + '/v1'
})

const localriotapi = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_BACK_URL + '/riot'
})

// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        console.log(error.response)
    }
    return Promise.reject(error.response)
}


// response interceptor
request.interceptors.response.use((response) => {
    return response.data
}, errorHandler)


localriotapi.interceptors.response.use((response) => {
    return response.data
}, errorHandler)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, request, localriotapi)
    }
}

export default request

export {
    installer as VueAxios,
    request,
    localriotapi
}
