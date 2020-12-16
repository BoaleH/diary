// 主要用于解决input输入框在获取焦点，页面被输入法顶上去，失去焦点，页面没有自动回弹的问题
export const pageScroll = () => {
  const inputArr = document.getElementsByTagName('input');
  for (let i =0; i < inputArr.length; i++) {
    inputArr[i].addEventListener('blur', () => {
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    })
  }

  const textareaArr = document.getElementsByTagName('textarea');
  for (let i =0; i < textareaArr.length; i++) {
    textareaArr[i].addEventListener('blur', () => {
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    })
  }
}