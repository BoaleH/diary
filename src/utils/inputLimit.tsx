// 限制手机号输入
export const mobileLimit = (data: string) => {
  if (data.length) {
    if (data.charAt(0) !== '1') {
      data = '';
    }
    if (data.length >= 11) {
      let str = data;
      data = str.slice(0, 11);
    }
    let str1 = data.replace(/\D/g, '');
    data = str1;
  }
  return data;
};

// 限制验证码输入
export const authLimit = (data: string) => {
  if (data.length >= 6) {
    let str = data;
    data = str.slice(0, 6);
  }
  data = data.replace(/\D/g, '');
  return data;
};