import React, { Component } from 'react';
import style from './Header.module.scss';

type StateType = {
  [propName: string]: any;
};
type PropType = {
  headerLeftBtnText?: string; // 左按钮文案
  clickLeftBtnCallBack?: any; // 点击左按钮的回调函数
  headerRightBtnText?: string; // 右按钮文案
  clickRightBtnCallBack?: any; // 点击右按钮的回调函数
  headerTitle: string; // 头部标题
  [propName: string]: any;
};
interface Header {
  state: StateType;
  props: PropType;
}

class Header extends Component {
  // 后退
  private goBack = () => {
    this.props.history.go(-1);
  }

  render() {
    const { headerTitle, headerLeftBtnText, clickLeftBtnCallBack, headerRightBtnText, clickRightBtnCallBack } = this.props;

    return (
      <div className={style.header}>
        {headerLeftBtnText && <div className={style.headerLeftBtn} onClick={clickLeftBtnCallBack ? clickLeftBtnCallBack : this.goBack}>{headerLeftBtnText}</div>}
        <div className={style.title}>{headerTitle}</div>
        {headerRightBtnText && <div className={style.headerRightBtn} onClick={clickRightBtnCallBack ? clickRightBtnCallBack : this.goBack}>{headerRightBtnText}</div>}
      </div>
    )
  }
}

export default Header;