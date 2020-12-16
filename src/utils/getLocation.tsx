import { Toast } from 'antd-mobile';
import request from "../utils/axiosUtil";
import { isWeixin } from './util.browser';
const wx = require("weixin-js-sdk");
const BMap = require('BMap');

// 获取微信签名及注入权限验证配置
export const wxConfig = async () => {
  if (!isWeixin()) {
    return false;
  }
  const params = {
    urlKey: "url",
    url: window.location.href,
    // appid: "wxf6e5355923dc6df5",
  };

  let result: any = null;
  try {
    const { data } = await request.post(`/wx/jsapi/getJsapiTicket`, params);
    result = data;
  } catch (error) {
    return false;
  }

  wx.config({
    debug: false,
    appId: result.appId,
    timestamp: parseInt(result.timestamp),
    nonceStr: result.nonceStr,
    signature: result.signature,
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "getLocation"],
  });

  return result;
};

// 获取微信经纬度
export const getWxLocation = async () => {
  console.log('微信定位');
  if (!isWeixin()) {
    return false;
  }

  // 如果微信签名接口挂了，则退出
  const wxConfigResult = await wxConfig();
  if (!wxConfigResult) {
    return false;
  }

  const promise = new Promise((resolve: any, reject: any) => {
    wx.ready(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (data: any) => {
          resolve(data);
        },
        fail: () => {
          console.log('微信定位失败，请检查是否开启手机定位功能');
          reject(false);
        },
        cancel: () => {
          console.log('您取消了微信定位功能');
          reject(false);
        },
      })
    })
    wx.error((res: any) => {
      reject(false);
    });
  })
  return promise;
}

// 获取浏览器经纬度
export const getBrowserLocation = () => {
  console.log('浏览器定位');
  const promise = new Promise((resolve: any, reject: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }
        resolve(data);
      }, (error) => {
        let errMsg = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errMsg = '您拒绝对获取地理位置的请求';
            break;
          case error.POSITION_UNAVAILABLE:
            errMsg = '位置信息是不可用的';
            break;
          case error.TIMEOUT:
            errMsg = '请求您的地理位置超时';
            break;
          default:
            errMsg = '未知错误';
            break;
        }
        console.log(errMsg);
        reject(false);
      });
    } else {
      console.log('您的浏览器不支持使用HTML 5来获取地理位置服务');
      reject(false);
    }
  });
  return promise;
}

// 获取百度地图定位
export const getBaiduLocationApi = async () => {
  console.log('百度定位');
  const promise = new Promise((resolve, reject) => {
    const geolocation = new BMap.Geolocation();
    geolocation.enableSDKLocation(); //允许SDK辅助
    geolocation.getCurrentPosition((r: any) => {
      if (geolocation.getStatus() === 0) {
        // 获取经纬度
        const data = {
          longitude: r.point.lng,
          latitude: r.point.lat,
        }
        resolve(data);
      } else {
        console.log('百度定位失败，请检查是否同意定位权限及开启手机定位功能')
        reject(false)
      }
    }, { enableHighAccuracy: true });
  })
  return promise;
}

// 获取百度地图逆地址解析
export const getBaiduReverseAddressResolution = async () => {
  let realLocation: any = null;
  // 优先获取微信定位
  try {
    realLocation = await getWxLocation();
  } catch (error) {
    console.log(error);
  }
  // 其次获取百度定位
  if (!realLocation) {
    try {
      realLocation = await getBaiduLocationApi();
    } catch (error) {
      console.log(error);
    }
  }
  // 最后获取浏览器定位
  if (!realLocation) {
    try {
      realLocation = await getBrowserLocation();
    } catch (error) {
      console.log(error);
    }
  }
  const promise = new Promise((resolve: any, reject: any) => {
    if (realLocation) {
      const point = new BMap.Point(realLocation.longitude, realLocation.latitude);
      const geoc = new BMap.Geocoder();
      // 获取逆地址解析
      geoc.getLocation(point, (rs: any) => {
        const addComp = rs.addressComponents;
        console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
        const res = {
          longitude: realLocation.longitude,
          latitude: realLocation.latitude,
          province: addComp.province,
          city: addComp.city,
          district: addComp.district,
          street: addComp.street,
          streetNumber: addComp.streetNumber,
        }
        localStorage.setItem('cityName', res.city.slice(0, res.city.length - 1));
        localStorage.setItem('locationObj', JSON.stringify(res));
        resolve(res)
      });
    } else {
      Toast.fail('定位失败，请检查是否同意定位权限及开启手机定位功能', 2);
      reject(false);
    }
  })
  return promise;
}