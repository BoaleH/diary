import React, { Component } from "react";
import phoneIcon from "../../assets/images/icon_phone.png";
import msgIcon from "../../assets/images/icon_msg.png";
import closeIcon from "../../assets/images/icon_close.png";
import imgCodeIcon from "../../assets/images/icon_imgCode.png";
import "./style/LoginComponent.scss";
import { mobileLimit, authLimit } from "../../utils/inputLimit";
import { validateTel, validateAuthcode } from "../../utils/validate";
import { Toast } from "antd-mobile";
import { changeLoginPopupShow } from "../../redux/action/CommonAction";
import { connect as realConnect } from "react-redux";
import { getLoginOrRegisterSmsApi, fetchLoginOrRegisterApi, getGraghicCodeApi } from "../../api/common";
import { pageScroll } from "../../utils/pageScroll";
import PrivacyProtocol from "./PrivacyProtocol";
import RegisterProtocol from "./RegisterProtocol";
import ImgCode from '../../components/ImgCode/ImgCode';

type StateType = {
  agreeProtocolStatus: boolean;
  phone: string;
  smsCode: string;
  getAuthCodeBtnText: string;
  isCountDown: boolean;
  canSubmit: boolean;
  isNewUser: boolean;
  isShowRegisterProtocol: boolean;
  isShowPrivacyProtocol: boolean;
  isShowGraghicAuth: boolean;
  whichGraghicCodeShow: string;
  graghicCode: string;
};
type PropType = {
  [propName: string]: any;
};
interface LoginComponent {
  state: StateType;
  props: PropType;
}

let timeOut: any = null;

// redux
const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const connect: any = realConnect;
@connect(mapStateToProps, { changeLoginPopupShow })
class LoginComponent extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      agreeProtocolStatus: false,
      phone: "",
      smsCode: "",
      getAuthCodeBtnText: "获取验证码",
      isCountDown: false,
      canSubmit: false,
      isNewUser: false,
      isShowRegisterProtocol: false,
      isShowPrivacyProtocol: false,
      isShowGraghicAuth: false,
      whichGraghicCodeShow: '',
      graghicCode: '',
    }
  }

  componentWillUnmount() {
    clearInterval(timeOut);
  }

  componentDidMount() {
    pageScroll();
  }

  // 输入手机号
  private inputPhoneNumber = (e: any) => {
    this.setState(
      {
        phone: mobileLimit(e.target.value),
      },
      () => {
        this.setCanSubmit();
      },
    );
  };

  // 输入短信验证码
  private inputSmsCode = (e: any) => {
    this.setState(
      {
        smsCode: authLimit(e.target.value),
      },
      () => {
        this.setCanSubmit();
      },
    );
  };

  // 输入图形验证码
  private inputImgCode = (e: any) => {
    this.setState({
      graghicCode: e.target.value,
    })
  }

  // 改变协议状态
  private changeAgreeStatus = () => {
    const { agreeProtocolStatus } = this.state;
    this.setState(
      {
        agreeProtocolStatus: !agreeProtocolStatus,
      },
      () => {
        this.setCanSubmit();
      },
    );
  };

  // 设置是否能提交注册
  private setCanSubmit = () => {
    const { phone, smsCode, agreeProtocolStatus, isNewUser } = this.state;
    // if (validateTel(phone) && validateAuthcode(smsCode) && ((isNewUser && agreeProtocolStatus) || !isNewUser)) {
    //   this.setState({
    //     canSubmit: true,
    //   });
    // } else {
    //   this.setState({
    //     canSubmit: false,
    //   });
    // }
    if (validateTel(phone) && validateAuthcode(smsCode)) {
      this.setState({
        canSubmit: true,
      });
    } else {
      this.setState({
        canSubmit: false,
      });
    }
  };

  // 判断是否能提交
  private judgeCanSubmit = () => {
    const { phone, smsCode, agreeProtocolStatus, isNewUser } = this.state;
    if (!validateTel(phone)) {
      Toast.info("请输入正确的手机号", 2);
      return false;
    }
    if (!validateAuthcode(smsCode)) {
      Toast.info("请输入正确的验证码", 2);
      return false;
    }
    // if (isNewUser && !agreeProtocolStatus) {
    //   Toast.info("请勾选已阅读并同意《用户注册协议》", 2);
    //   return false;
    // }
    // if (validateTel(phone) && validateAuthcode(smsCode) && ((isNewUser && agreeProtocolStatus) || !isNewUser)) {
    //   return true;
    // } else {
    //   return false;
    // }
    if (validateTel(phone) && validateAuthcode(smsCode)) {
      return true;
    } else {
      return false;
    }
  };

  // 提交
  private fetchSubmit = async () => {
    if (this.judgeCanSubmit()) {
      const { phone, smsCode } = this.state;
      const params = {
        phone,
        smsCode,
        invateCode: localStorage.getItem("otherInvateCode") || "",
        registerTaskReceiveNo: localStorage.getItem("registerTaskReceiveNo") || "",
        punchTaskReceiveNo: localStorage.getItem("punchTaskReceiveNo") || "",
      };
      const res: any = await fetchLoginOrRegisterApi(params);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("employeeUserNo", res.data.employeeUserNo);
      localStorage.setItem("phone", phone);
      localStorage.setItem("ownerInvateCode", res.data.invateCode);
      this.closePopup();
      // 登录成功重新加载页面请求接口
      window.location.reload();
    }
  };

  // 获取验证码
  private getAuthCode = () => {
    // if (!validateTel(this.state.phone)) {
    //   Toast.info("请输入正确的手机号", 2);
    //   return;
    // }
    // if (!this.state.isCountDown) {
    //   this.fetchAuthCode();
    // } else {
    //   Toast.info("请倒计时结束后重新获取", 2);
    // }
    if (!validateTel(this.state.phone)) {
      Toast.info("请输入正确的手机号", 2);
      return;
    }
    if (!this.state.isCountDown) {
      // 展示图形验证码
      this.getGraghicCode();
      this.setState({
        isShowGraghicAuth: true,
      })
    } else {
      Toast.info("请倒计时结束后重新获取", 2);
    }
  };

  // 请求短信验证码
  private fetchAuthCode = async () => {
    if (!this.state.graghicCode) {
      Toast.info("请输入图形验证码", 1);
      return;
    }
    const { phone, graghicCode } = this.state;
    const params = {
      phone,
      graghicCode,
    };
    try {
      const res: any = await getLoginOrRegisterSmsApi(params);
      if (res.code === 0) {
        this.setState({
          getAuthCodeBtnText: "120s",
          isCountDown: true,
          isNewUser: res.data.isNewUser,
          isShowGraghicAuth: false,
          whichGraghicCodeShow: '',
          graghicCode: '',
        });
        this.countDown();
      }
    } catch (err) {
      setTimeout(() => {
        this.getGraghicCode();
      }, 1000)
    }
  };

  // 获取图形验证码
  private getGraghicCode = async () => {
    const params = {
      phone: this.state.phone
    }
    const res: any = await getGraghicCodeApi(params);
    this.setState({
      whichGraghicCodeShow: res.data,
    })
  }

  // 倒计时
  private countDown = () => {
    let time = 119; // 设为119是因为计时器会有1s延迟
    timeOut = setInterval(() => {
      this.setState({
        getAuthCodeBtnText: `${time}s`,
      });
      time--;
      if (time < 0) {
        this.setState({
          getAuthCodeBtnText: "重新获取验证码",
          isCountDown: false,
        });
        clearInterval(timeOut);
      }
    }, 1000);
  };

  // 关闭弹窗
  private closePopup = () => {
    clearInterval(timeOut);
    this.props.changeLoginPopupShow(false);
  };

  // 展示用户注册协议
  private showRegisterProtocol = () => {
    const { isShowRegisterProtocol } = this.state;
    this.setState({
      isShowRegisterProtocol: !isShowRegisterProtocol,
    });
  };

  // 展示用户隐私协议
  private showPrivacyProtocol = () => {
    const { isShowPrivacyProtocol } = this.state;
    this.setState({
      isShowPrivacyProtocol: !isShowPrivacyProtocol,
    });
  };

  render() {
    const { phone, smsCode, agreeProtocolStatus, getAuthCodeBtnText, isCountDown, canSubmit, isNewUser, isShowPrivacyProtocol, isShowRegisterProtocol, isShowGraghicAuth, whichGraghicCodeShow, graghicCode } = this.state;

    return (
      <div className="login">
        {/* 登录弹窗 */}
        {
          !isShowGraghicAuth && <div className="login-box">
            <div className="login-box-title">登录/注册</div>
            <div className="item">
              <div className="item-icon">
                <img src={phoneIcon} alt="" />
              </div>
              <div className="item-operate">
                <input type="number" placeholder="请输入手机号" value={phone} onChange={this.inputPhoneNumber} className="item-operate-input item-operate-input-phone" />
              </div>
            </div>
            <div className="item">
              <div className="item-icon">
                <img src={msgIcon} alt="" />
              </div>
              <div className="item-operate">
                <input type="number" placeholder="请输入验证码" value={smsCode} onChange={this.inputSmsCode} className="item-operate-input item-operate-input-auth" />
                <span className={isCountDown ? "is-count-down" : "count-down"} onClick={this.getAuthCode}>
                  {getAuthCodeBtnText}
                </span>
              </div>
            </div>
            {/* {isNewUser && (
              <div className="agree-protocol">
                <div className="agree-protocol-outside" onClick={this.changeAgreeStatus}>
                  <div className={agreeProtocolStatus ? "agree-protocol-box agree-protocol-box-agree" : "agree-protocol-box"}></div>
                  <span className="agree-protocol-box-prompt">我已阅读并同意</span>
                </div>
                <div className="agree-protocol-outside agree-protocol-outside-bottom">
                  <span className="agree-protocol-box-protocol" onClick={this.showRegisterProtocol}>
                    《用户注册协议》
                  </span>
                  、
                  <span className="agree-protocol-box-protocol" onClick={this.showPrivacyProtocol}>
                    《隐私政策》
                  </span>
                </div>
              </div>
            )} */}
            {isShowRegisterProtocol && <RegisterProtocol closeCallBack={this.showRegisterProtocol} />}
            {isShowPrivacyProtocol && <PrivacyProtocol closeCallBack={this.showPrivacyProtocol} />}
            <div className="submit-btn" onClick={this.fetchSubmit}>
              <span>登录/注册</span>
              {!canSubmit && <div className="unavailable"></div>}
            </div>
            <div className="close-icon" onClick={this.closePopup}>
              <img src={closeIcon} alt="" />
            </div>
          </div>
        }
        {/* 图形验证码弹窗 */}
        {
          isShowGraghicAuth && <div className="login-box">
            <div className="login-box-title">图形验证</div>
            <div className="item">
              <div className="item-icon">
                <img src={imgCodeIcon} alt="" />
              </div>
              <div className="item-operate">
                <input type="text" placeholder="请输入图形验证码" maxLength={4} value={graghicCode} onChange={this.inputImgCode} className="item-operate-input item-operate-input-imgauth" />
                <ImgCode identifyCode={whichGraghicCodeShow} refresh={this.getGraghicCode} />
              </div>
            </div>
            <div className="submit-btn" onClick={this.fetchAuthCode}>
              <span>确定</span>
              {!graghicCode && <div className="unavailable"></div>}
            </div>
            <div className="close-icon" onClick={this.closePopup}>
              <img src={closeIcon} alt="" />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default LoginComponent;
