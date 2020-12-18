import ajax from '../utils/axiosUtil';

// 注册
export const registerApi = (data: any) => {
  return ajax.post('/api/v2/auth/register', data);
};