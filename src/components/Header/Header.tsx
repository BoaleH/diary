import React, { Component } from 'react';
import { withRouter as realWithRouter } from "react-router-dom";
import style from './Header.module.scss';
import { connect as realConnect } from "react-redux";
import { changeToken } from '../../redux/action/CommonAction';

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
  showGoBackToMyDiary?: boolean; // 是否展示退回我的日记
  showLogout?: boolean; // 是否展示退出按钮
  [propName: string]: any;
};
interface Header {
  state: StateType;
  props: PropType;
}

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const connect: any = realConnect;

// 获取路由信息
const withRouter: any = realWithRouter;
@connect(mapStateToProps, { changeToken })
@withRouter

class Header extends Component {
  constructor(props: any) {
    super(props);
  }

  // 注销登录
  private logout = () => {
    this.props.changeToken('');
    this.props.history.push('/Login');
  }

  // 退回我的日记
  private goBackToMyDiary = () => {
    this.props.history.push('/MyDiary');
  }

  render() {
    const { headerTitle, headerLeftBtnText, clickLeftBtnCallBack, needLeftBtnBoxshadow, headerRightBtnText, clickRightBtnCallBack, needRightBtnBoxshadow, showLogout, showGoBackToMyDiary } = this.props;

    return (
      <div className={style.header} style={(headerLeftBtnText || showGoBackToMyDiary) ? {justifyContent: 'space-between'} : {}}>
        {headerLeftBtnText && <div className={style.headerLeftBtn} style={needLeftBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={clickLeftBtnCallBack ? clickLeftBtnCallBack : () => {}}>{headerLeftBtnText}</div>}
        {showGoBackToMyDiary && <div className={style.headerLeftBtn} style={needLeftBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={this.goBackToMyDiary}>退回</div>}
        <div className={style.title}>{headerTitle}</div>
        {headerRightBtnText && <div className={style.headerRightBtn} style={needRightBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={clickRightBtnCallBack ? clickRightBtnCallBack : () => {}}>{headerRightBtnText}</div>}
        {showLogout && <div className={style.headerRightBtn} style={needRightBtnBoxshadow ? {boxShadow: '0 2px 0px 0 rgba(0, 0, 0, 0.5)'} : {}} onClick={this.logout}>退出</div>}
      </div>
    )
  }
}

export default Header;