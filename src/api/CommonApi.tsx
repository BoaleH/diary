import ajax from '../utils/axiosUtil';

// 注册
export const registerApi = (data: any) => {
  return ajax.post('/api/v2/auth/register', data);
};

// 登录
export const loginApi = (data: any) => {
  return ajax.post('/api/v2/auth/login', data);
};

// 获取个人数据
export const getPersonalInfoApi = () => {
  return ajax.get('/api/v2/users/me');
};