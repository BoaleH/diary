import ajax from "../utils/axiosUtil";

const positionSquareApi = {
  listPositionByPage: (params: any) => ajax.post(`/employee/api/v1/listPositionByPage`, params), // 职位列表
  getCityList: () => ajax.get('/city/api/v1/getCityList'), //城市列表
  getJobDetailApi: (data: any) => ajax.post('/employee/api/v1/fetchPositionInfo', data), // 获取职位详情
  submitSignUpApi: (data: any) => ajax.post('/employee/api/v1/onePositionSignUp', data), // 报名职位
};
export default positionSquareApi;
