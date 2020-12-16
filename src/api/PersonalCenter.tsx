import ajax from '../utils/axiosUtil';

// 注销账号
export const logoutApi = () => {
  return ajax.post('/employee/api/v1/logout');
};

// 获取用户信息
export const getUserInfoApi = (employeeUserNo: string | null) => {
  return ajax.get(`/employee/api/v1/fetchPersonalInfo/${employeeUserNo}`);
}

// 用户意见反馈
export const feedbackApi = (data: any, employeeUserNo: string | null) => {
  return ajax.post(`/employee/api/v1/submitOpinionInfo/${employeeUserNo}`, data);
}

// 修改个人信息
export const updatePersonalInfoApi = (data: any, employeeUserNo: string | null) => {
  return ajax.post(`/employee/api/v1/modifyPersonalInfo/${employeeUserNo}`, data);
}
// 对我感兴趣列表
export const interestPositionListApi = (data: any) => {
  return ajax.post(`/employee/api/v1/interestPositionList`, data);
}
// 已报名岗位列表
export const listSignedPositionByPageApi = (data: any | null) => {
  return ajax.post(`/employee/api/v1/listSignedPositionByPage`, data);
}
// 对我感兴趣列表全部报名
export const applyAllInterviewApi = (data: any | null) => {
  return ajax.post(`/employee/api/v1/applyAllInterview`, data);
}
// 切换角色
export const switchRoleApi = (data: any | null) => {
  return ajax.post(`/employee/api/v1/switchToAgentRole`, data);
}

