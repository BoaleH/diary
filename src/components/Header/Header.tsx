import React, { Component } from 'react';
import style from './Header.module.scss';

type StateType = {
  [propName: string]: any;
};
type PropType = {
  headerLeftBtnText?: string; // 左按钮文案
  clickLeftBtnCallBack?: any; // 点击左按钮的回调函数
  needLeftBtnBoxshadow?: boolean; // 是否展示左按钮阴影
  headerRightBtnText?: string; // 右按钮文案
  clickRightBtnCallBack?: any; // 点击右按钮的回调函数
  needRightBtnBoxshadow?: boolean; // 是否展示右按钮阴影
  headerTitle: string; // 头部标题
  [propName: string]: any;
};
interface Header {
  state: StateType;
  props: PropType;
}

class Header extends Component {

  render() {
    const { headerTitle, headerLeftBtnText, clickLeftBtnCallBack, needLeftBtnBoxshadow, headerRightBtnText, clickRightBtnCallBack, needRightBtnBoxshadow } = this.props;

    return (
      <div className={style.header} style={headerLeftBtnText ? {justifyContent: 'space-between'} : {}}>
        {headerLeftBtnText && <div className={style.headerLeftBtn} style={needLeftBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={clickLeftBtnCallBack ? clickLeftBtnCallBack : () => {}}>{headerLeftBtnText}</div>}
        <div className={style.title}>{headerTitle}</div>
        {headerRightBtnText && <div className={style.headerRightBtn} style={needRightBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={clickRightBtnCallBack ? clickRightBtnCallBack : () => {}}>{headerRightBtnText}</div>}
      </div>
    )
  }
}

export default Header;