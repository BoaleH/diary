import React, { Component } from 'react';
import style from './style/Register.module.scss';
import Header from '../../components/Header/Header';
import LoginOrRegisterCard from '../../components/LoginOrRegisterCard/LoginOrRegisterCard';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button/Button';
import { registerApi } from '../../api/CommonApi';
import { connect as realConnect } from "react-redux";
import { changeToken } from '../../redux/action/CommonAction';

type StateType = {
  name: string;
  email: string;
  password: string;
  errorPrompt: string;
  btnDisable: boolean;
};
type PropType = {
  [propName: string]: any;
};
interface Register {
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

class Register extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '', // 名字
      email: '', // 邮件地址
      password: '', // 密码
      errorPrompt: '', // 错误提示
      btnDisable: false, // 按钮禁用
    }
  }

  // 输入姓名
  private inputName = (e: any) => {
    this.setState({
      name: e.target.value,
    });
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

  // 注册
  private submit = async () => {
    const { name, email, password } = this.state;
    if (!name) {
      this.setState({
        errorPrompt: '请输入名字',
      });
      return;
    }
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
      name,
      email,
      password,
    }
    this.setState({
      btnDisable: true,
    });

    try {
      const res: any = await registerApi(params);
      this.props.changeToken(res.token);
      this.props.history.push('/');
    } catch (error) {
      console.log(error)
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

  // 跳转去登录页
  private toLogin = () => {
    this.props.history.push('/Login');
  }

  render() {
    const { errorPrompt, btnDisable } = this.state;
    return (
      <div className={style.page}>
        <Header headerTitle='注册'/>
        <div className={style.pageContent}>
          <LoginOrRegisterCard errorPrompt={errorPrompt}>
            <div className={style.nameInput}>
              <InputItem inputItemTitle="名字" InputItemPlaceholder="名字..." inputType="text" inputCallback={this.inputName}/>
            </div>
            <div className={style.emailInput}>
              <InputItem inputItemTitle="邮件地址" InputItemPlaceholder="邮件地址..." inputType="email" inputCallback={this.inputEmail}/>
            </div>
            <div className={style.passwordInput}>
              <InputItem inputItemTitle="密码" InputItemPlaceholder="密码..." inputType="password" inputCallback={this.inputPassword}/>
            </div>
            <div className={style.btn}>
              <Button bottonText="注册" btnWidth={165} btnHeigth={50} btnClickCallBack={this.submit} disabled={btnDisable} />
            </div>
            <div className={style.switchRegisterOrLogin} onClick={this.toLogin}><span>已有账号？去登录</span></div>
          </LoginOrRegisterCard>
        </div>
      </div>
    )
  }
}

export default Register;