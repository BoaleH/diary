import React, { Component } from 'react';
import style from './InputItem.module.scss';

const defaultProps = {
  titleFontSize: 22,
  titleMarginBottom: 13,
  inputType: 'text',
};

type StateType = {
  [propName: string]: any;
};
type PropType = {
  inputItemTitle: string; // 输入框标题
  titleFontSize?: number; // 输入框标题大小
  titleMarginBottom?: number; // 输入框标题与输入框的间距
  InputItemPlaceholder?: string; // 输入框提示
  inputType?: string; // 输入框输入类型
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
    const { inputItemTitle, InputItemPlaceholder, inputType } = this.props;

    return (
      <div className={style.InputItem}>
        <div className={style.InputItemTitle} style={this.handleTitleStyle()}>{inputItemTitle}</div>
        <input type={inputType} className={style.InputItemInput} placeholder={InputItemPlaceholder}/>
      </div>
    )
  }
}

export default InputItem;