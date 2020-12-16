import axios from 'axios';
import urlConfig from './urlConfig';
import { Toast } from 'antd-mobile';
// import store from '../redux/store';
// import { changeLoginPopupShow } from '../redux/action/CommonAction';

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

// 处理登录失效
const handleLoginInvalid = () => {
  // 提示错误
  if (localStorage.getItem('token')) {
    Toast.fail('登录失效，请重新登录', 2);
  } else {
    Toast.fail('请登录后再使用', 2);
  }
  // 清除登录信息
  localStorage.removeItem('token');
  localStorage.removeItem('phone');
  localStorage.removeItem('employeeUserNo');
  localStorage.removeItem('ownerInvateCode');
  // 跳转去登录
  // store.dispatch(changeLoginPopupShow(true));
  // 防止同一页面调用多个接口，导致重复跳转/Login
  if ((window.location.href.indexOf('/Login') === -1)) {
    window.reactHistory.push("/Login");
  }
}

// axios请求拦截
ajax.interceptors.request.use((config) => {
  // 获取redux里的state
  // console.log('获取redux里的state', store.getState())

  // 展示loading
  Toast.loading('加载中...', 0);
  // 做请求拦截
  config.headers.token = localStorage.getItem('token') || '';
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
  if (res.code === 1) {
    // 提示错误
    Toast.fail(res.msg, 2);
    return Promise.reject(res.msg);
  }
  return Promise.resolve(res);
}, (error) => {
  // 清除loading
  Toast.hide();
  if (error && error.response && (error.response.status === 401 || error.response.status === 403 || error.response.status === 409)) { // 401.token为空或校验失败 403.无权访问其他用户信息 409. 多设备登录被挤下线
    handleLoginInvalid();
    return Promise.reject(false);
  } else {
    // 提示错误
    Toast.fail('系统错误，请联系管理员', 2);
    return Promise.reject(error);
  }
});

export default ajax;
