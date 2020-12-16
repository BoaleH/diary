import { Toast } from 'antd-mobile';

export const getUrlParam = (name: string, href: string | undefined = undefined) => {
  const _search = href ? href.split('?')[1] : window.location.search.substr(1);
  if (_search) {
    const _reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const _regNext = _search.match(_reg);
    if (_regNext) {
      return decodeURI(_regNext[2]) || '';
    }
    return '';
  }
  return '';
};

// 获取百度地图定位
export const getBaiduLocationApi = async () => {
  const promiseItem = new Promise((resolve, reject) => {
    // 引入百度地图
    const BMap = require('BMap');
    const geolocation = new BMap.Geolocation();
    geolocation.enableSDKLocation(); //允许SDK辅助
    geolocation.getCurrentPosition((r: any) => {
      if (geolocation.getStatus() === 0) {
        // 获取经纬度
        console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        const point = new BMap.Point(r.point.lng, r.point.lat);
        const geoc = new BMap.Geocoder();
        // 获取逆地址解析
        geoc.getLocation(point, (rs: any) => {
          const addComp = rs.addressComponents;
          console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
          const res = {
            longitude: r.point.lng,
            latitude: r.point.lat,
            province: addComp.province,
            city: addComp.city,
            district: addComp.district,
            street: addComp.street,
            streetNumber: addComp.streetNumber,
          }
          resolve(res)
        });
      } else {
        // console.log('定位失败');
        Toast.fail('定位失败，请检查是否开启手机定位功能', 2);
        reject('定位失败');
      }
    }, { enableHighAccuracy: true });
  })
  return promiseItem;
}
export const unitShow = (unitCode: number) => {
  switch (unitCode) {
    case 0: return '元/时';
    case 1: return '元/日';
    case 2: return '元/月';
    default:
      break;
  }
}

