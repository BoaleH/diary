import React, { Component } from 'react'
import './style/PersonalCenter.scss';
import defaultAvatal from '../../assets/images/PersonalCenter/avatal.png';
import rightIcon from '../../assets/images/PersonalCenter/rightIcon.png';
import icon_interested from '../../assets/images/PersonalCenter/icon_interested.png';
import icon_enroll from '../../assets/images/PersonalCenter/icon_enroll.png';
import Layout from '../../layout/Layout';
import { Modal } from 'antd-mobile';
import { logoutApi, getUserInfoApi, switchRoleApi } from '../../api/PersonalCenter';
import { connect as realConnect } from 'react-redux';
import { changeLoginPopupShow } from '../../redux/action/CommonAction';
// import { Toast } from 'antd-mobile';
import { replaceTel } from '../../utils/validate';
import urlConfig from '../../utils/urlConfig';
import PopupPortals from '../../components/PopupModal/PopupModal';


const alert = Modal.alert;

type StateType = {
  avatalUrl: string;
  employeeRealName: string;
  operateRightIcon: string;
  phone: string;
  personalSignature: string;
  popupStatus: boolean;
}
type PropType = {
  name: string;
  number: number;
  [propName: string]: any;
};
interface PersonalCenter {
  state: StateType;
  props: PropType;
}

// 获取redux
const mapStateToProps = (state: any) => {
  return {
    state
  }
}
const connect: any = realConnect;
@connect(mapStateToProps, { changeLoginPopupShow })

class PersonalCenter extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      avatalUrl: defaultAvatal,
      employeeRealName: '',
      operateRightIcon: rightIcon,
      phone: '',
      personalSignature: '',
      popupStatus: false,
    }
  }

  componentDidMount() {
    localStorage.getItem('token') && this.getUserInfo();
  }

  // 获取个人信息
  private getUserInfo = async () => {
    const employeeUserNo = localStorage.getItem('employeeUserNo');
    const res = await getUserInfoApi(employeeUserNo);
    this.setState({
      employeeRealName: res.data.employeeRealName || '',
      phone: res.data.phone || '',
      personalSignature: res.data.personalSignature || '',
      avatalUrl: res.data.headPicUrl || defaultAvatal,
    })
  }

  // 跳转页面
  private toJumpPage = (link: String) => {
    this.props.history.push(link);
  }
  // 注销
  private logout = () => {
    alert('温馨提示', '是否确认退出账号？', [
      { text: '取消', onPress: () => { } },
      {
        text: '确认', onPress: async () => {
          await logoutApi();
          // 清除登录信息
          localStorage.removeItem('token');
          localStorage.removeItem('phone');
          localStorage.removeItem('employeeUserNo');
          localStorage.removeItem('ownerInvateCode');
          this.setState({
            avatalUrl: defaultAvatal,
            employeeRealName: '',
            operateRightIcon: rightIcon,
            phone: '',
            personalSignature: '',
          })
        }
      },
    ])
  }

  // 登录
  private login = (isAvatal?: any) => {
    const token = localStorage.getItem('token');
    if (isAvatal && token) {
      return;
    }
    // this.props.changeLoginPopupShow(true);
    this.props.history.push('/Login');
  }

  // 展示或隐藏切换角色确认弹框
  closeModal = (status: boolean) => {
    this.setState({
      popupStatus: status
    })
  }

  // 切换角色
  private switchRole = async () => {
    if (localStorage.getItem('token')) {
      const _Storage: any = localStorage.getItem('locationObj');
      const locationObj: any = JSON.parse(_Storage);
      const params = {
        longitude: locationObj.longitude,
        latitude: locationObj.latitude,
        address: locationObj.city + locationObj.district,
      }
      const res: any = await switchRoleApi(params);
      let hrUrl = `${urlConfig().hrUrl}/PersonalCenter?hrToken=${res.data.token}&agentUserNo=${res.data.agentUserNo}&phone=${res.data.phone}`;
      window.location.href = hrUrl;
    } else {
      window.location.href = urlConfig().hrUrl;
    }
  }

  render() {
    const { avatalUrl, phone, employeeRealName, personalSignature, operateRightIcon, popupStatus } = this.state;
    const token = localStorage.getItem('token');
    return (
      <Layout title="个人中心" showBottomBar style={{ background: '#f7f7f7' }}>
        <div className="personal-center">
          <div className="personal-center-header">
            <div className="personal-center-header-userinfo">
              <div className="userinfo-avatal" onClick={() => { this.login(true) }}>
                <img src={avatalUrl} alt="" />
              </div>
              <div className="userinfo-introduction">
                {!token && <div className="userinfo-name" onClick={this.login}>未登录</div>}
                {employeeRealName && <div className="userinfo-name">Hi,{employeeRealName}</div>}
                {phone && !employeeRealName && <div className="userinfo-name">Hi,{replaceTel(phone)}</div>}
                {personalSignature && <div className="userinfo-msg">{personalSignature}</div>}
              </div>
            </div>
          </div>
          <div className="persoanl-middle">
            <div className="persoanl-middle-box" onClick={() => this.toJumpPage('/EnrollPost')}>
              <img src={icon_enroll} alt="" />
              <p>已报名岗位</p>
            </div>
            <div className="persoanl-middle-box" onClick={() => this.toJumpPage('/InterestedMe')}>
              <img src={icon_interested} alt="" />
              <p>对我感兴趣</p>
            </div>
          </div>
          <div className="operate">
            <div className="operate-item" onClick={() => this.toJumpPage('/PersonalInfo')}>
              <div className="operate-item-title operate-userinfo">个人信息</div>
              <img src={operateRightIcon} alt="" />
            </div>
            <div className="operate-item" onClick={() => this.closeModal(true)}>
              <div className="operate-item-title operate-employee">我要招工</div>
              <p className="operate-employee-p">
                <span>切换</span>
                <img src={operateRightIcon} alt="" />
              </p>
            </div>
            <div className="operate-item" onClick={() => this.toJumpPage('/Feedback')}>
              <div className="operate-item-title operate-feedback">意见反馈</div>
              <img src={operateRightIcon} alt="" />
            </div>
          </div>
          {token && <div className="login-btn" onClick={this.logout}>退出账号</div>}
          {/* {!token && <div className="login-btn" onClick={this.login}>退出账号</div>} */}
          <div className="steward-tel">客服电话：18123731239</div>
        </div>
        {popupStatus && <PopupPortals closeModal={this.closeModal} handleBtnClick={this.switchRole} PopupConetn={{ title: '是否切换至招聘者身份？', content: '', btnText: '确定' }} />}
      </Layout>
    )
  }
}

export default PersonalCenter;