import React, { Component } from 'react';
import style from './style/Login.module.scss';
import Header from '../../components/Header/Header';
import LoginOrRegisterCard from '../../components/LoginOrRegisterCard/LoginOrRegisterCard';

export default class Login extends Component {
  render() {
    return (
      <div className={style.loginPage}>
        <Header headerTitle='登录'/>
      </div>
    )
  }
}
