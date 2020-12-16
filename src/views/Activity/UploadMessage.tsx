import React, { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import Layout from "../../layout/Layout";
import iconAdd from "../../assets/images/Activity/icon_add.png";
import iconPositionbig from "../../assets/images/Activity/iconPositionbig.png";
import iconResetPosition from "../../assets/images/Activity/iconResetPosition.png";
import "./style/UploadMessage.scss";
import Upload from "../../components/Upload/Upload";
import activityApi from "../../api/activityApi";
import { getUrlParam } from "../../utils/common";
import { connect as realConnect } from "react-redux";
import { asyncChangeLocation } from '../../redux/asyncAction/AsyncCommonAction';

type StateType = {
  receiveNo: string | null;
  inviteCode: string | null;
  punchTaskReceiveNo: string | null;
  taskNo: string | null;
  files: any;
  messageInfo: string;
  fountCount: number;
};
type PropType = {
  [propName: string]: any;
};

interface UploadMessage {
  state: StateType;
  props: PropType;
}

// 获取redux
const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
const connect: any = realConnect;
@connect(mapStateToProps, { asyncChangeLocation })

class UploadMessage extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      receiveNo: getUrlParam("receiveRecordNo"),
      inviteCode: localStorage.getItem("otherInvateCode"),
      punchTaskReceiveNo: localStorage.getItem("punchTaskReceiveNo"),
      taskNo: getUrlParam("taskNo"),
      files: [],
      messageInfo: "",
      fountCount: 0,
    };
  }

  // 获取定位
  private getLocation = async () => {
    asyncChangeLocation();
  };

  // 上传后的回调
  private uploadCallBack = (callBackData: any) => {
    const { files } = this.state;
    files.push(callBackData);
    this.setState({
      files,
    });
  };

  // 删除文件
  private deleteItem = (index: number) => {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({
      files,
    });
  };

  // 留言输入
  private changeInput = (e: any) => {
    if (e.target.value.length <= 200) {
      this.setState({
        fountCount: e.target.value.length,
        messageInfo: e.target.value,
      });
    } else {
      Toast.info("最多只能输入200个字", 1);
    }
  };

  // 提交注册
  private submit = async () => {
    const { receiveNo, inviteCode, punchTaskReceiveNo, taskNo, files, messageInfo } = this.state;
    if (!(messageInfo.length > 0)) {
      Toast.fail("请输入您的留言", 2);
      return;
    }
    if (!(files.length > 0)) {
      Toast.fail("请至少上传一张图片", 2);
      return;
    }
    let picKey1 = files[0] ? files[0].fileKey : null;
    let picKey2 = files[1] ? files[1].fileKey : null;
    let picKey3 = files[2] ? files[2].fileKey : null;
    const { addressObj = {} } = this.props.state.CommonReducer;
    const params = {
      receiveNo,
      inviteCode,
      punchTaskReceiveNo,
      messageInfo,
      taskNo,
      picKey1,
      picKey2,
      picKey3,
      longitude: addressObj.longitude,
      latitude: addressObj.latitude,
      address: `${addressObj.province}${addressObj.city}${addressObj.district}${addressObj.street}${addressObj.streetNumber}`,
    }
    await activityApi.punchCardInfoApi(params, localStorage.getItem('employeeUserNo'));
    Toast.success('打卡成功', 2, () => {
      this.props.history.goBack();
    })
  }

  render() {
    const { files, fountCount, messageInfo } = this.state;
    const { addressObj = {} } = this.props.state.CommonReducer;

    return (
      <Layout title="富士康线下面试打卡" showTopBar style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <textarea placeholder="请输入您的留言..." className="textarea" value={messageInfo} maxLength={200} onChange={this.changeInput} />
          <div className="border">
            <div className="limit-count">{fountCount} / 200</div>
          </div>
          <div style={{ display: "flex" }}>
            {files &&
              files.length > 0 &&
              files.map((file: any, index: number) => {
                return (
                  <div style={{ display: "inline-block" }} key={index}>
                    <div className="file-item">
                      <img src={file.imageUrl} className="upload-img" alt=""></img>
                      <Icon type="cross-circle" className="close-icon" onClick={() => this.deleteItem(index)} color="#FFFFFF;"></Icon>
                    </div>
                </div>
                )
              })
            }
            {
              files && files.length < 3 ?
                <div className='file-item'>
                  <Upload uploadCallBack={this.uploadCallBack} accept='image/*' />
                  <div className='add'>
                    <img src={iconAdd} className='add-icon' alt=""></img>
                  </div>
                </div> : ''
            }
          </div>
          <div className="position">
            <div className="left">
              <img src={iconPositionbig} alt="" className="left-icon" />
              <span className="left-font">{`${addressObj.province}${addressObj.city}${addressObj.district}${addressObj.street}${addressObj.streetNumber}`}</span>
            </div>
            <div className="right" onClick={this.getLocation}>
              <img src={iconResetPosition} alt="" className="right-icon" />
              <span className="right-font">重新定位</span>
            </div>
          </div>
          <div className="submit" onClick={this.submit}>
            提交
          </div>
        </div>
      </Layout>
    );
  }
}

export default UploadMessage;
