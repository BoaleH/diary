import React from 'react';
import style from './Button.module.scss';

type props = {
  bottonText: string; // 按钮文案
  btnWidth?: number; // 按钮宽度
  btnHeigth?: number; // 按钮高度
  fontSize?: number; // 文字大小
  disabled?: boolean; // 是否禁用
  btnClickCallBack?: any; // 按钮点击的回调函数
  [propName: string]: any;
};

export default function Button(props: props) {
  const { btnWidth, btnHeigth, fontSize, bottonText, disabled, btnClickCallBack } = props;
  const handleBtnStyle = () => {
    const btnWidth1 = btnWidth || 165;
    const btnHeigth1 = btnHeigth || 50;
    const fontSize1 = fontSize || 28;
    const titleStyle = {
      width: `${btnWidth1/1440*document.documentElement.clientWidth}px`,
      height: `${btnHeigth1/1440*document.documentElement.clientWidth}px`,
      fontSize: `${fontSize1/1440*document.documentElement.clientWidth}px`,
    }
    return titleStyle;
  }

  return (
    <div className={disabled ? style.disabled : style.button} style={handleBtnStyle()} onClick={disabled ? () => {} : btnClickCallBack}>
      {bottonText}
    </div>
  )
}

Button.defaultProps = {
  btnWidth: 165,
  btnHeigth: 50,
  fontSize: 28,
}