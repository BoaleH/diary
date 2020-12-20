import axios from 'axios';
import urlConfig from './urlConfig';
import store from '../redux/store';

let baseURL = urlConfig().backendBaseUrl;

// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// axios请求拦截
ajax.interceptors.request.use((config) => {
  // 做请求拦截
  config.headers.authsessiontoken = store.getState().CommonReducer.token || '';
  // config.headers.authsessiontoken = localStorage.getItem('token');
  return config;
}, (error) => {
  // 对请求失败做点什么
  Promise.reject(error);
});

// axios响应拦截
ajax.interceptors.response.use((response) => {
  const res = response.data;
  return Promise.resolve(res);
}, (error) => {
  return Promise.reject(error);
});

export default ajax;
