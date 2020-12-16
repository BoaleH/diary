import request from "../utils/axiosUtil";
const wx = require("weixin-js-sdk");
const shareJs = function (jssdk?: any) {
  wx.config({
    debug: false,
    appId: jssdk.appId,
    timestamp: parseInt(jssdk.timestamp),
    nonceStr: jssdk.nonceStr,
    signature: jssdk.signature,
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "getLocation"],
  });
};
export const wxgetData = async () => {
  const ua = window.navigator.userAgent.toLowerCase();
  //如果不在微信浏览器内，微信分享也没意义了对吧？这里判断一下
  if (ua.indexOf("micromessenger") < 0) return false;
  const params = {
    urlKey: "url",
    url: window.location.href,
    // appid: "wxf6e5355923dc6df5",
  };
  const { data } = await request.post(`/wx/jsapi/getJsapiTicket`, params);
  shareJs(data);
};
export const wxShareDate = (options: any) => {
  wx.ready(function () {
    //需在用户可能点击分享按钮前就先调用
    wx.updateTimelineShareData({
      title: options.title, // 分享标题
      link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: options.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
    });
    wx.updateAppMessageShareData({
      title: options.title, // 分享标题
      desc: options.desc, // 分享描述
      link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: options.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
    });
  });
};
