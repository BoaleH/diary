// 验证手机号
export function validateTel(mobile: string) {
  return /^1[2-9]\d{9}$/.test(mobile);
}

// 验证验证码
export function validateAuthcode(authCode: string) {
  return /^\d{6}$/.test(authCode);
}

// 隐藏手机号中间4位
export function replaceTel(telNum: string) {
  return telNum.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
// 隐藏身份证号中间13位
export function replaceIdentify(Identify: string) {
  return Identify.replace(/^(.{3})(?:\d+)(.{2})$/, '$1*************$2');
}
// 卡号前4，后4不加密，中间加密
export function replaceBankCard(BankCard: string) {
  return BankCard.replace(/^(.{4})(?:\d+)(.{4})$/, '$1*************$2');
}
// 币种英文转中文
export function replaceCurrency(Currency: string) {
  if (Currency === 'RMB') {
    Currency = '人民币';
  }
  return Currency;
}
// 验证密码
export function validatePwd(pwdText: string) {
  return /^([A-Z]|[a-z]|[0-9]){6,16}$/.test(pwdText);
}
// 验证协议验证码
export function validateAuthcodePro(authCode: string) {
  return /^\d{3}-\d{6}$/.test(authCode);
}
// 验证座机号
export function validateLandlines(landlines: string) {
  return /^0\d{2,3}-[1-9]\d{6,7}$/.test(landlines);
}
// 验证金额
export function validateMoney(money: string) {
  return /(^[1-9]([0-9]{0,3})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money);
}
// 去所有空格
export function trim(str: string) {
  return str.replace(/\s/g, '');
}
// 验证图形验证码
export function validateImgcode(imgCode: string) {
  return /^[a-zA-Z0-9]{4}$/.test(imgCode);
}
// 港澳 规则： H/M + 10位或6位数字
export function validateHK(text: string) {
  return /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(text);
}
// 台湾 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
export function validateTW(text: string) {
  return /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(text);
}
// 验证是否为护照
export function validatePassPort(text: string) {
  return /^[0-9a-zA-Z]/.test(text);
}
// 验证是否为身份证号
export function validateIdcard(text: string) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
}
// 验证是否为姓名
export function validateRealName(text: string) {
  return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(text);
}
