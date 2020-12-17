import React, { Component } from 'react';
import style from './style/Login.module.scss';
import Header from '../../components/Header/Header';
import LoginOrRegisterCard from '../../components/LoginOrRegisterCard/LoginOrRegisterCard';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button/Button';

class Login extends Component {
  render() {
    return (
      <div className={style.page}>
        <Header headerTitle='登录'/>
        <div className={style.pageContent}>
          <LoginOrRegisterCard>
            <div className={style.emailInput}>
              <InputItem inputItemTitle="邮件地址" InputItemPlaceholder="邮件地址..." inputType="email"/>
            </div>
            <div className={style.passwordInput}>
              <InputItem inputItemTitle="密码" InputItemPlaceholder="密码..." inputType="password"/>
            </div>
            <div className={style.btn}>
              <Button bottonText="登录" btnWidth={165} btnHeigth={50} />
            </div>
            <div className={style.switchRegisterOrLogin}><span>没有账号？注册</span></div>
          </LoginOrRegisterCard>
        </div>
      </div>
    )
  }
}

export default Login;