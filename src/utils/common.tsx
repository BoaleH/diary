// 获取查询字符串参数
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

// 格式化时间
export const formatDate = (dateTime: number) => {
  const date: any = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`
}