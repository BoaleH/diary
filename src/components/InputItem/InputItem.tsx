import React from 'react';
import style from './InputItem.module.scss';

type props = {
  inputOrTextarea?: string; // 选择input或textarea
  inputItemTitle: string; // 输入框标题
  titleFontSize?: number; // 输入框标题大小
  titleMarginBottom?: number; // 输入框标题与输入框的间距
  InputItemPlaceholder?: string; // 输入框提示
  inputType?: string; // 输入框输入类型
  inputCallback: any; // 输入回调函数
  [propName: string]: any;
};

export default function InputItem(props: props) {
  const { titleFontSize, titleMarginBottom, inputOrTextarea, inputItemTitle, InputItemPlaceholder, inputType, inputCallback } = props;
  // 处理标题样式
  const handleTitleStyle = () => {
    const FontSize = titleFontSize || 22;
    const MarginBottom = titleMarginBottom || 13;
    const titleStyle = {
      fontSize: `${FontSize/1440*document.documentElement.clientWidth}px`,
      marginBottom: `${MarginBottom/1440*document.documentElement.clientWidth}px`,
    }
    return titleStyle;
  }

  return (
    <div className={style.InputItem}>
      <div className={style.InputItemTitle} style={handleTitleStyle()}>{inputItemTitle}</div>
      {inputOrTextarea === 'input' && <input type={inputType} className={style.InputItemInput} placeholder={InputItemPlaceholder} onChange={inputCallback} />}
      {inputOrTextarea === 'textarea' && <textarea placeholder={InputItemPlaceholder} className={style.InputItemTextarea} onChange={inputCallback} />}
    </div>
  )
}

InputItem.defaultProps = {
  inputOrTextarea: 'input',
  titleFontSize: 22,
  titleMarginBottom: 13,
  inputType: 'text',
}
