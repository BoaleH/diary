// 开发环境地址
const urlDev = {
  backendBaseUrl: "https://hngbo-54b18a.postdemo.tcn.asia", // 后台地址
};
// uat环境地址
const urlUat = {
  backendBaseUrl: "https://hngbo-54b18a.postdemo.tcn.asia", // 后台地址
};
// sit环境地址
const urlSit = {
  backendBaseUrl: "https://hngbo-54b18a.postdemo.tcn.asia", // 后台地址
};
// 生产环境地址
const urlProd = {
  backendBaseUrl: "https://hngbo-54b18a.postdemo.tcn.asia", // 后台地址
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
