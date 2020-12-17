import React, { Component, Fragment } from 'react';
import style from './LoginOrRegisterCard.module.scss';
import avatalImg from './images/avatal.png';

type StateType = {
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};
interface LoginOrRegisterCard {
  state: StateType;
  props: PropType;
}
class LoginOrRegisterCard extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={style.LoginOrRegisterCard}>
        <div className={style.avatal}>
          <img src={avatalImg} alt="LoginOrRegisterCardAvatalImg"/>
        </div>
        <Fragment>
          {children}
        </Fragment>
      </div>
    )
  }
}

export default LoginOrRegisterCard;
