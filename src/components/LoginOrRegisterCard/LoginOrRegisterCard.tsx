import React, { Fragment } from 'react';
import style from './LoginOrRegisterCard.module.scss';
import avatalImg from './images/avatal.png';

type props = {
  errorPrompt?: string; // 错误提示
  [propName: string]: any;
};

export default function LoginOrRegisterCard(props: props) {
  const { children, errorPrompt } = props
  
  return (
    <div className={style.LoginOrRegisterCard}>
      <div className={style.avatal}>
        <img src={avatalImg} alt="LoginOrRegisterCardAvatalImg"/>
      </div>
      {errorPrompt && <div className={style.error}>{errorPrompt}</div>}
      <Fragment>
        {children}
      </Fragment>
    </div>
  )
}
