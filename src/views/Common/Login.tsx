import React, { Component } from 'react';
import style from './style/Login.module.scss';
import Header from '../../components/Header/Header';
import LoginOrRegisterCard from '../../components/LoginOrRegisterCard/LoginOrRegisterCard';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button/Button';
import { loginApi } from '../../api/CommonApi';
import { connect as realConnect } from "react-redux";
import { changeToken } from '../../redux/action/CommonAction';

type StateType = {
  email: string;
  password: string;
  errorPrompt: string;
  btnDisable: boolean;
};
type PropType = {
  [propName: string]: any;
};
interface Login {
  state: StateType;
  props: PropType;
}

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const connect: any = realConnect;
@connect(mapStateToProps, { changeToken })

class Login extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '', // 邮件地址
      password: '', // 密码
      errorPrompt: '', // 错误提示
      btnDisable: false, // 按钮禁用
    }
  }

  // 输入email
  private inputEmail = (e: any) => {
    this.setState({
      email: e.target.value,
    });
  }

  // 输入密码
  private inputPassword = (e: any) => {
    this.setState({
      password: e.target.value,
    });
  }

  // 登录
  private submit = async () => {
    const { email, password } = this.state;
    if (!email) {
      this.setState({
        errorPrompt: '请输入邮件地址',
      });
      return;
    }
    if (!password) {
      this.setState({
        errorPrompt: '请输入密码',
      });
      return;
    }
    const params = {
      email,
      password,
    }
    this.setState({
      btnDisable: true,
    });
    try {
      const res: any = await loginApi(params);
      this.props.changeToken(res.token);
      this.props.history.push('/');
    } catch (error) {
      const statusCode = error.response.status || null;
      switch (statusCode) {
        case 400:
          this.setState({
            btnDisable: false,
            errorPrompt: '用户名或密码不正确或者签发JWT失败',
          });
          break;
        case 500:
          this.setState({
            btnDisable: false,
            errorPrompt: '内部服务器错误',
          });
          break;
        default:
          this.setState({
            btnDisable: false,
            errorPrompt: '内部服务器错误',
          });
          break;
      }
    }
  }

  // 跳转去注册页
  private toRegister = () => {
    this.props.history.push('/Register');
  }

  render() {
    const { errorPrompt, btnDisable } = this.state;
    return (
      <div className={style.page}>
        <Header headerTitle='登录'/>
        <div className={style.pageContent}>
          <LoginOrRegisterCard errorPrompt={errorPrompt}>
            <div className={style.emailInput}>
              <InputItem inputItemTitle="邮件地址" InputItemPlaceholder="邮件地址..." inputType="email" inputCallback={this.inputEmail}/>
            </div>
            <div className={style.passwordInput}>
              <InputItem inputItemTitle="密码" InputItemPlaceholder="密码..." inputType="password" inputCallback={this.inputPassword}/>
            </div>
            <div className={style.btn}>
              <Button bottonText="登录" btnWidth={165} btnHeigth={50} btnClickCallBack={this.submit} disabled={btnDisable} />
            </div>
            <div className={style.switchRegisterOrLogin} onClick={this.toRegister}><span>没有账号？注册</span></div>
          </LoginOrRegisterCard>
        </div>
      </div>
    )
  }
}

export default Login;