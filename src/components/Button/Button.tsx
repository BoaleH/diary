import React, { Component } from 'react';
import style from './Button.module.scss';

const defaultProps = {
  btnWidth: 165,
  btnHeigth: 50,
  fontSize: 28,
};

type StateType = {
  [propName: string]: any;
};
type PropType = {
  bottonText: string; // 按钮文案
  btnWidth?: number; // 按钮宽度
  btnHeigth?: number; // 按钮高度
  fontSize?: number; // 文字大小
  disabled?: boolean; // 是否禁用
  [propName: string]: any;
};
interface Button {
  state: StateType;
  props: PropType;
}

class Button extends Component {
  // 设置默认props
  static defaultProps = defaultProps;

  private handleBtnStyle = () => {
    const btnWidth = this.props.btnWidth || 165;
    const btnHeigth = this.props.btnHeigth || 50;
    const fontSize = this.props.fontSize || 28;
    const titleStyle = {
      width: `${btnWidth/1440*document.documentElement.clientWidth}px`,
      height: `${btnHeigth/1440*document.documentElement.clientWidth}px`,
      fontSize: `${fontSize/1440*document.documentElement.clientWidth}px`,
    }
    return titleStyle;
  }

  render() {
    const { bottonText, disabled } = this.props;
    return (
      <div className={disabled ? style.disabled : style.button} style={this.handleBtnStyle()}>
        {bottonText}
      </div>
    )
  }
}

export default Button;
