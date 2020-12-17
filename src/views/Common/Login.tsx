import React, { Component } from 'react';
import style from './style/Login.module.scss';
import Header from '../../components/Header/Header';
import LoginOrRegisterCard from '../../components/LoginOrRegisterCard/LoginOrRegisterCard';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button/Button';

export default class Login extends Component {
  render() {
    return (
      <div className={style.loginPage}>
        <Header headerTitle='登录'/>
        <div className={style.loginPageContent}>
          <LoginOrRegisterCard>
            <div className={style.emailInput}>
              <InputItem inputItemTitle="邮件地址" InputItemPlaceholder="邮件地址..." inputType="email"/>
            </div>
            <div className={style.passwordInput}>
              <InputItem inputItemTitle="密码" InputItemPlaceholder="密码..." inputType="password"/>
            </div>
            <div className="btn">
              <Button bottonText="登录" btnWidth={165} btnHeigth={50} />
            </div>
            ss
          </LoginOrRegisterCard>
        </div>
      </div>
    )
  }
}
