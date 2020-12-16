import React, { Component } from 'react';
import './style/PersonalInfo.scss';
import rightIcon from '../../assets/images/PersonalCenter/rightIcon.png';
import nav_arrow from "../../assets/images/Common/nav_arrow.png";
import Layout from '../../layout/Layout';
import { Picker } from 'antd-mobile';
import location from '../../assets/data/location.json';
import { getUserInfoApi, updatePersonalInfoApi } from '../../api/PersonalCenter';
import { connect as realConnect } from "react-redux";
import { getUrlParam } from '../../utils/common';
import { Toast } from 'antd-mobile';
import activityApi from '../../api/activityApi';
import { pageScroll } from '../../utils/pageScroll';
import TopBar from '../../components/TopBar';

type StateType = {
  modifyPersonalTaskReceiveNo: string | null;
  employeeRealName: string;
  gender: number | null;
  age: string;
  education: number | null;
  whichEduShow: string;
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  areaCode: string;
  areaName: string;
  address: string;
  jobStatus: number | null;
};
type PropType = {
  [propName: string]: any;
};
interface PersonalInfo {
  state: StateType;
  props: PropType;
}

// 性别
const genderArr = [{
  label: '男',
  value: 1,
}, {
  label: '女',
  value: 2,
}];

// 年龄
const aggArr: any = [];
for (let i = 18; i <= 100; i++) {
  aggArr.push({
    label: i.toString(),
    value: i.toString()
  });
}

// 学历
const educationArr = [{
  label: '小学',
  value: 1,
}, {
  label: '初中',
  value: 2,
}, {
  label: '高中',
  value: 3,
}, {
  label: '中专',
  value: 4,
}, {
  label: '大专',
  value: 5,
}, {
  label: '本科',
  value: 6,
}, {
  label: '硕士',
  value: 7,
}, {
  label: '博士',
  value: 8,
}, {
  label: '博士以上',
  value: 9,
}];

// 求职状态
const jobStatusArr = [{
  label: '离职',
  value: 0,
}, {
  label: '在职',
  value: 1,
}];

// 获取redux
const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
const connect: any = realConnect;
@connect(mapStateToProps)

class PersonalInfo extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      modifyPersonalTaskReceiveNo: getUrlParam('modifyPersonalTaskReceiveNo') || null,
      employeeRealName: '',
      gender: null,
      age: '',
      education: null,
      whichEduShow: '',
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      areaCode: '',
      areaName: '',
      address: '',
      jobStatus: null,
    }
  }

  componentDidMount() {
    localStorage.getItem('token') && this.getUserInfo();
    (!this.state.modifyPersonalTaskReceiveNo) && this.recieveTask();
    pageScroll();
  }

  // 如果不是链接返回的modifyPersonalTaskReceiveNo，自动领取任务
  private recieveTask = async () => {
    const res: any = await activityApi.receiveTask(localStorage.getItem('employeeUserNo'), '10002');
    this.setState({
      modifyPersonalTaskReceiveNo: res.data || null,
    })
  }

  // 获取个人信息
  private getUserInfo = async () => {
    const employeeUserNo = localStorage.getItem('employeeUserNo');
    const res = await getUserInfoApi(employeeUserNo);
    this.setState({
      employeeRealName: res.data.employeeRealName || '',
      gender: res.data.gender,
      age: res.data.age || '',
      provinceCode: res.data.provinceCode || '',
      provinceName: res.data.provinceName || '',
      cityCode: res.data.cityCode || '',
      cityName: res.data.cityName || '',
      areaCode: res.data.areaCode || '',
      areaName: res.data.areaName || '',
      address: res.data.address || '',
      jobStatus: res.data.jobStatus,
    })
    this.changeEdu([res.data.education]);
  }

  // 改变姓名
  private changeUserName = (e: any) => {
    this.setState({
      employeeRealName: e.target.value,
    })
  }

  // 改变性别
  private changeGender = (e: any) => {
    this.setState({
      gender: e[0],
    })
  }

  // 改变年龄
  private changeAge = (e: any) => {
    this.setState({
      age: e[0],
    })
  }

  // 改变学历
  private changeEdu = (e: any) => {
    let whichEduShow: string = '';
    switch (e[0]) {
      case 1:
        whichEduShow = '小学';
        break;
      case 2:
        whichEduShow = '初中';
        break;
      case 3:
        whichEduShow = '高中';
        break;
      case 4:
        whichEduShow = '中专';
        break;
      case 5:
        whichEduShow = '大专';
        break;
      case 6:
        whichEduShow = '本科';
        break;
      case 7:
        whichEduShow = '硕士';
        break;
      case 8:
        whichEduShow = '博士';
        break;
      case 9:
        whichEduShow = '博士以上';
        break;
      default:
        break;
    }
    this.setState({
      education: e[0] || null,
      whichEduShow
    });
    return whichEduShow;
  }

  // 处理省市区
  private handleLocation = () => {
    let antdDistrict: any = [];
    let districtData: any = location;
    Object.keys(districtData).forEach((index) => {
      let itemLevel1: any = {};
      let itemLevel2: any = {};
      itemLevel1.value = districtData[index].code;
      itemLevel1.label = districtData[index].name;
      itemLevel1.children = [];
      let data = districtData[index].cities;
      Object.keys(data).forEach((index) => {
        itemLevel2.value = data[index].code;
        itemLevel2.label = data[index].name;
        itemLevel2.children = [];
        let data2 = data[index].districts;
        let itemLevel3: any = {};
        itemLevel3.children = [];
        Object.keys(data2).forEach((index) => {
          itemLevel3.value = index;
          itemLevel3.label = data2[index];
          itemLevel2.children.push(itemLevel3);
          itemLevel3 = {};
        });
        itemLevel1.children.push(itemLevel2);
        itemLevel2 = {};
      });
      antdDistrict.push(itemLevel1)
    });
    return antdDistrict;
  }

  // 改变省市区
  private changeLocation = (e: any) => {
    const locationArr = this.handleLocation();
    let provinceCode = e[0];
    let provinceName = '';
    let cityCode = e[1];
    let cityName = '';
    let areaCode = e[2];
    let areaName = '';
    locationArr.forEach((ele: any) => {
      if (ele.value === e[0]) {
        provinceName = ele.label;
        ele.children.forEach((item: any) => {
          if (item.value === e[1]) {
            cityName = item.label;
            item.children.forEach((child: any) => {
              if (child.value === e[2]) {
                areaName = child.label;
              }
            })
          }
        })
      }
    })
    this.setState({
      provinceCode,
      provinceName,
      cityCode,
      cityName,
      areaCode,
      areaName,
    })
  }

  // 改变详细地址
  private changeAddress = (e: any) => {
    this.setState({
      address: e.target.value,
    })
  }

  // 改变求职状态
  private changeJobStatus = (e: any) => {
    this.setState({
      jobStatus: e[0],
    })
  }

  // 提交
  private fetchSubmit = async () => {
    if (!this.state.provinceCode) {
      Toast.info('请选择工作意向地', 2);
      return;
    }
    if (this.state.employeeRealName && ((this.state.employeeRealName.length > 10) || (this.state.employeeRealName.length < 2))) {
      Toast.fail('姓名请控制在2~10个字符之间', 2);
      return false;
    }
    const employeeUserNo = localStorage.getItem('employeeUserNo');
    const { addressObj } = this.props.state.CommonReducer;
    const params = {
      ...this.state,
      longitude: addressObj.longitude,
      latitude: addressObj.latitude,
    }
    await updatePersonalInfoApi(params, employeeUserNo);
    Toast.success('个人信息修改成功', 2, () => {
      this.props.history.go(-1);
    });
  }

  // 判断是否能提交
  private judgeCanSubmit = () => {
    if (this.state.provinceCode) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { employeeRealName, gender, age, whichEduShow, provinceName, cityName, areaName, jobStatus } = this.state;
    return (
      // <Layout title="完善个人信息" showTopBar>
      <Layout>
        <TopBar centerSlot="完善个人信息" leftSlot={nav_arrow} rightSlot='保存' rightEvent={this.fetchSubmit} />
        <div className="personal-info">
          <div className="personal-info-item">
            <div className="personal-info-item-title">姓名</div>
            <div className="personal-info-item-operate">
              <input className="input-item operate-value" value={employeeRealName} onChange={this.changeUserName} type="text" placeholder="请输入您的姓名" />
            </div>
          </div>
          <Picker
            title='选择性别'
            data={genderArr}
            cols={1}
            onChange={this.changeGender}
          >
            <div className="personal-info-item">
              <div className="personal-info-item-title">性别</div>
              <div className="personal-info-item-operate picker-operate">
                {!gender && <span className="operate-prompt">请选择您的性别</span>}
                <span className="operate-value">{gender && (gender === 1 ? '男' : '女')}</span>
                <img className="right-icon" src={rightIcon} alt="" />
              </div>
            </div>
          </Picker>
          <Picker
            title='选择年龄'
            data={aggArr}
            cols={1}
            onChange={this.changeAge}
          >
            <div className="personal-info-item">
              <div className="personal-info-item-title">年龄</div>
              <div className="personal-info-item-operate picker-operate">
                {!age && <span className="operate-prompt">请选择您的年龄</span>}
                <span className="operate-value">{age}</span>
                <img className="right-icon" src={rightIcon} alt="" />
              </div>
            </div>
          </Picker>
          <Picker
            title='选择学历'
            data={educationArr}
            cols={1}
            onChange={this.changeEdu}
          >
            <div className="personal-info-item">
              <div className="personal-info-item-title">学历</div>
              <div className="personal-info-item-operate picker-operate">
                {!whichEduShow && <span className="operate-prompt">请选择您的学历</span>}
                <span className="operate-value">{whichEduShow}</span>
                <img className="right-icon" src={rightIcon} alt="" />
              </div>
            </div>
          </Picker>
          <Picker
            title='选择意向工作地'
            extra="请选择(可选)"
            data={this.handleLocation()}
            onChange={this.changeLocation}
          >
            <div className="personal-info-item">
              <div className="personal-info-item-title">意向工作地</div>
              <div className="personal-info-item-operate picker-operate">
                <div className="show-prompt-little">
                  {!provinceName && <span className="operate-prompt">请选择您的意向工作地</span>}
                  <span className="operate-value">{provinceName + cityName + areaName}</span>
                  <span className="operate-prompt-little">精准填写，帮您寻找附近新机会</span>
                </div>
                <img className="right-icon" src={rightIcon} alt="" />
              </div>
            </div>
          </Picker>
          {/* <div className="personal-info-item">
            <div className="personal-info-item-title">详细地址</div>
            <div className="personal-info-item-operate">
              <input className="input-item operate-value" value={address} onChange={this.changeAddress} type="text" placeholder="请输入您的详细地址"/>
            </div>
          </div> */}
          <Picker
            title='选择求职状态'
            data={jobStatusArr}
            cols={1}
            onChange={this.changeJobStatus}
          >
            <div className="personal-info-item">
              <div className="personal-info-item-title">求职状态</div>
              <div className="personal-info-item-operate picker-operate">
                {(jobStatus !== 0 && jobStatus !== 1) && <span className="operate-prompt">请选择您的求职状态</span>}
                <span className="operate-value">{(jobStatus === 0 || jobStatus === 1) && (jobStatus === 0 ? '离职' : '在职')}</span>
                <img className="right-icon" src={rightIcon} alt="" />
              </div>
            </div>
          </Picker>
          {/* <div className="submit-btn" onClick={this.judgeCanSubmit() ? this.fetchSubmit : () => { }}>
            <span>保存</span>
            {!this.judgeCanSubmit() && <div className="unavailable"></div>}
          </div> */}
        </div>
      </Layout>
    )
  }
}

export default PersonalInfo;