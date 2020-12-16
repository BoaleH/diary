import ajax from '../utils/axiosUtil';

// 获取登录注册短信验证码
export const getLoginOrRegisterSmsApi = (data: any) => {
  return ajax.post('/employee/api/v1/loginOrRegisterSms', data);
};

// 登录或注册
export const fetchLoginOrRegisterApi = (data: any) => {
  return ajax.post('/employee/api/v1/loginOrRegister', data);
};

export const getGraghicCodeApi = (data: any) => {
  return ajax.post('/employee/api/v1/fetchGraghicCode', data);
}


