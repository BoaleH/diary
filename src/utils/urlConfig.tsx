// 开发环境地址
const urlDev = {
  backendBaseUrl: "https://employee-uat.fuzfu.net/job-platform-employee", // 后台地址
  // backendBaseUrl: "http://192.168.96.141:8010/job-platform-employee",
  employeeUrl: 'https://job-uat.fuzfu.net', // 应聘端地址
  hrUrl: 'https://recruit-uat.fuzfu.net', // 招聘端地址
};
// uat环境地址
const urlUat = {
  backendBaseUrl: "https://employee-uat.fuzfu.net/job-platform-employee", // 后台地址
  employeeUrl: 'https://job-uat.fuzfu.net', // 应聘端地址
  hrUrl: 'https://recruit-uat.fuzfu.net', // 招聘端地址
};
// sit环境地址
const urlSit = {
  backendBaseUrl: "https://employee-uat.fuzfu.net/job-platform-employee", // 后台地址
  employeeUrl: 'https://job-uat.fuzfu.net', // 应聘端地址
  hrUrl: 'https://recruit-uat.fuzfu.net', // 招聘端地址
};
// 生产环境地址
const urlProd = {
  backendBaseUrl: "https://employee.fuzfu.net/job-platform-employee", // 后台地址
  employeeUrl: 'https://job.fuzfu.net', // 应聘端地址
  hrUrl: 'https://recruit.fuzfu.net', // 招聘端地址
};

const urlConfig = () => {
  // 通过环境赋值baseURL
  if (process.env.REACT_APP_ENV === "development") {
    return urlDev;
  } else if (process.env.REACT_APP_ENV === "uat") {
    return urlUat;
  } else if (process.env.REACT_APP_ENV === "sit") {
    return urlSit;
  } else {
    return urlProd;
  }
};
export default urlConfig;
