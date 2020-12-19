import React, { Component } from 'react';
import style from './InputItem.module.scss';

const defaultProps = {
  inputOrTextarea: 'input',
  titleFontSize: 22,
  titleMarginBottom: 13,
  inputType: 'text',
};

type StateType = {
  [propName: string]: any;
};
type PropType = {
  inputOrTextarea?: string; // 选择input或textarea
  inputItemTitle: string; // 输入框标题
  titleFontSize?: number; // 输入框标题大小
  titleMarginBottom?: number; // 输入框标题与输入框的间距
  InputItemPlaceholder?: string; // 输入框提示
  inputType?: string; // 输入框输入类型
  inputCallback: any; // 输入回调函数
  [propName: string]: any;
};
interface InputItem {
  state: StateType;
  props: PropType;
}

class InputItem extends Component {
  // 设置默认props
  static defaultProps = defaultProps;

  private handleTitleStyle = () => {
    const titleFontSize = this.props.titleFontSize || 22;
    const titleMarginBottom = this.props.titleMarginBottom || 13;
    const titleStyle = {
      fontSize: `${titleFontSize/1440*document.documentElement.clientWidth}px`,
      marginBottom: `${titleMarginBottom/1440*document.documentElement.clientWidth}px`,
    }
    return titleStyle;
  }

  render() {
    const { inputOrTextarea, inputItemTitle, InputItemPlaceholder, inputType, inputCallback } = this.props;

    return (
      <div className={style.InputItem}>
        <div className={style.InputItemTitle} style={this.handleTitleStyle()}>{inputItemTitle}</div>
        {inputOrTextarea === 'input' && <input type={inputType} className={style.InputItemInput} placeholder={InputItemPlaceholder} onChange={inputCallback} />}
        {inputOrTextarea === 'textarea' && <textarea placeholder={InputItemPlaceholder} className={style.InputItemTextarea} onChange={inputCallback} />}
      </div>
    )
  }
}

export default InputItem;