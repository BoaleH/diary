import axios from 'axios';
import urlConfig from './urlConfig';
import { Toast } from 'antd-mobile';
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
  // 展示loading
  Toast.loading('加载中...', 0);
  // 做请求拦截
  config.headers.authsessiontoken = store.getState().CommonReducer.token || '';
  return config;
}, (error) => {
  // 清除loading
  Toast.hide();
  // 对请求失败做点什么
  Promise.reject(error);
});

// axios响应拦截
ajax.interceptors.response.use((response) => {
  // 清除loading
  Toast.hide();
  const res = response.data;
  return Promise.resolve(res);
}, (error) => {
  // 清除loading
  Toast.hide();
  // if (error && error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 404 || error.response.status === 500)) { // 401.token为空或校验失败 403.无权访问其他用户信息 409. 多设备登录被挤下线
  //   handleLoginInvalid();
  // }
  // Toast.fail(error.response.data.error, 2);
  return Promise.reject(error);
});

export default ajax;
