import ajax from "../utils/axiosUtil";

const activityApi = {
  getTaskList: (params: any) => ajax.post(`/task/api/v1/taskList`, params), // 任务列表
  receiveTask: (employeeUserNo: any, taskNo: any) => ajax.get(`/task/api/v1/${employeeUserNo}/receiveTask/${taskNo}`), //任务领取
  weekIntegralRankingList: (data: any) => ajax.post(`integralRanking/api/v1/weekIntegralRankingList`, data), //周排行榜
  totalIntegralRankingList: (data: any) => ajax.post(`integralRanking/api/v1/totalIntegralRankingList`, data), //总排行榜
  personalDetail: (params: any) => ajax.post(`/employee/api/v1/personalDetail`, params), //个人账户信息
  uploadImageApi: (data: any, employeeUserNo: string | null) => ajax.post(`/task/api/v1/${employeeUserNo}/uploadPicture`, data),
  // 提交打卡
  punchCardInfoApi: (data: any, employeeUserNo: string | null) => ajax.post(`/task/api/v1/${employeeUserNo}/submitPunchCardInfo`, data),
};
export default activityApi;
