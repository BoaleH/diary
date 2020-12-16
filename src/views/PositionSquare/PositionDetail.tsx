import React, { Component, createRef } from 'react';
import './style/PositionDetail.scss';
import { Carousel, Toast } from 'antd-mobile';
import positionSquareApi from "../../api/positionSquareApi";
import { getUrlParam } from '../../utils/common';
import qiyerenzhen from '../../assets/images/Job/icon_qiyerenzhen.png';
import touxiangrenzhen from '../../assets/images/Job/icon_touxiangrenzhen.png';
import positionIcon from '../../assets/images/Job/position.png';
import gobackIcon from '../../assets/images/Job/fanhui.png';
import shareIcon from '../../assets/images/Job/fenxiang.png';
import showMoreIcon from '../../assets/images/Job/icon_showMore.png';
import share2 from "../../assets/images/Activity/share2.png";
import close from "../../assets/images/icon_close.png";
import { wxgetData, wxShareDate } from "../../utils/wxShare";
import { isWeixin } from '../../utils/util.browser';
import defaultAgentHeaderImg from '../../assets/images/Activity/activityHead.png';
import ImgView from '../../components/ImgView/ImgView';
import { pageScroll } from "../../utils/pageScroll";

const BMap = require('BMap');

type StateType = {
  jobDetail: any;
  isShowShareModal: boolean;
  showMoreBtnText: string;
  currentSwiperIndex: number;
  imgViewUrl: string,
  imgViewShow: boolean,
};
type PropType = {
  [propName: string]: any;
};
interface PositionDetail {
  state: StateType;
  props: PropType;
  jobDesc: any;
}

class PositionDetail extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      jobDetail: {
        agentNo:"",
        agentName:"",
        agentCompanyName:"",
        agentHeaderImg:"",
        positionNo:"",
        positionName:"",
        positionLogoUrl:"",
        workPrice:"",
        workPriceUnit: 0,
        positionVedioUrl:"",
        hiringCommpanyName:"",
        workAddress:"",
        workAddressDetail:"",
        longitude:"",
        latitude:"",
        workDesc:"",
        workContent:"",
        workSalary:"",
        otherDesc:"",
        isSignUp: null,
        positionImgUrls: []
      },
      isShowShareModal: false,
      showMoreBtnText: '',
      currentSwiperIndex: 0,
      imgViewUrl: '',
      imgViewShow: false,
    }
    this.jobDesc = createRef();
  }

  componentDidMount() {
    this.getJobDetail();
    pageScroll();
  }

  // 获取分享链接
  private getShareUrl = () => {
    const urlStr: any = window.location.href;
    const positionNo = getUrlParam('positionNo');
    const link = `${urlStr.split('?')[0]}?positionNo=${positionNo}&isFromShare=true`;
    return link;
  }

  private getJobDetail = async () => {
    const params = {
      employeeUserNo: localStorage.getItem('employeeUserNo') || null,
      positionNo: getUrlParam('positionNo') || null,
    }
    const res: any = await positionSquareApi.getJobDetailApi(params);
    console.log(res)
    this.setState({
      jobDetail: res.data,
    }, () => {
      res.data.longitude && this.createMap();
      this.judgeShowMoreBtn();
      isWeixin() && Promise.all([wxgetData()]).then(() => {
        wxShareDate({
          title: '给您推荐一个岗位',
          desc: res.data.hiringCommpanyName + '正在扩招' + res.data.positionName,
          imgUrl: res.data.positionLogoUrl,
          link: this.getShareUrl(),
        });
      });
    })
  }

  // 工价单位展示
  private unitShow = (unitCode: number) => {
    let unitShow = '';
    switch (unitCode) {
      case 0:
        unitShow = '元/时';
        break;
      case 1:
        unitShow = '元/日';
        break;
      case 2:
        unitShow = '元/月';
        break;
      default:
        break;
    }
    return unitShow;
  }

  private goBack = () => {
    if (getUrlParam('isFromShare')) {
      this.props.history.push('/Activity')
    } else {
      this.props.history.go(-1);
    }
  }
  // 展示分享遮罩层
  private handleShare = () => {
    this.setState({
      isShowShareModal: true
    })
  }

  // 隐藏分享遮罩层
  private hideShareModal = () => {
    this.setState({
      isShowShareModal: false,
    })
  }

  private createMap = () => {
    // 创建Map实例
    const map = new BMap.Map("allmap");
    // 创建点
    const point = new BMap.Point(this.state.jobDetail.longitude, this.state.jobDetail.latitude);
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(point, 15);
    // 创建标注点
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);
    const opts = {
      width: 100,
      height: 50,
    }
    // 定义信息窗口
    const infoWindow = new BMap.InfoWindow(this.state.jobDetail.workAddress + this.state.jobDetail.workAddressDetail, opts);
    // 添加标注点点击事件
    marker.addEventListener('click', () => {
      // 展示信息窗口
      map.openInfoWindow(infoWindow, point);
    })
  }

  // 复制
  private onCopy = () => {
    const copyDOM: any = document.querySelector("#codeValue");
    const range: any = document.createRange();
    range.selectNode(copyDOM);
    const selection: any = window.getSelection();
    // 移除选中的元素
    if (selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    copyDOM.setSelectionRange(0, 999999);
    document.execCommand("copy");
    Toast.info("复制成功", 1);
  }

  // 报名
  private submitSignUp = async () => {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/Login');
      return;
    }
    const params = {
      employeeUserNo: localStorage.getItem('employeeUserNo') || null,
      positionNo: getUrlParam('positionNo') || null,
    }
    await positionSquareApi.submitSignUpApi(params);
    setTimeout(() => {
      Toast.info("报名成功", 2);
    }, 400)
    this.getJobDetail();
  }

  // 判断是否展示更多按钮
  private judgeShowMoreBtn = () => {
    const realHeight = this.jobDesc.current.offsetHeight;
    if (realHeight / document.body.clientWidth > 240 / 375) {
      this.setState({
        showMoreBtnText: '查看更多'
      })
    }
  }

  private handleShowMore = () => {
    if (this.state.showMoreBtnText === '查看更多') {
      this.setState({
        showMoreBtnText: '收起'
      })
    }
    if (this.state.showMoreBtnText === '收起') {
      this.setState({
        showMoreBtnText: '查看更多'
      })
    }
  }

  // 轮播图切换
  private swiperChange = (current: any) => {
    this.setState({
      currentSwiperIndex: current,
    })
  }

  // 展示图片预览
  private showImgView = (url: string) => {
    this.setState({
      imgViewUrl: url,
      imgViewShow: true,
    })
  }

  // 隐藏图片预览
  private hideImgView = () => {
    this.setState({
      imgViewShow: false,
    })
  }

  render() {
    const { jobDetail, isShowShareModal, showMoreBtnText, currentSwiperIndex, imgViewShow, imgViewUrl } = this.state;
    return (
      <div className="job-detail">
        <div className="job-detail-info">
          <div className="job-detail-header">
            <img src={gobackIcon} alt="" className="go-back-icon" onClick={this.goBack}/>
            <img src={shareIcon} alt="" className="share-icon" onClick={this.handleShare}/>
            {
              isShowShareModal && isWeixin() && <div className="myModal" onClick={this.hideShareModal}>
                <img src={share2} alt="" className="modalArrow" />
                <div className="modalContent">
                  <div className="modalText">
                    <p>请点击右上角，将它发送给指定朋友或分享到朋友圈</p>
                  </div>
                </div>
              </div>
            }
            {
              isShowShareModal && !isWeixin() && <div className="myModalShare">
                <div className="share-box">
                  <p>分享给好友</p>
                  <div className="share-content">
                    {/* <div className="share-way">
                      <p>方法一：</p>
                      <p>关注“富鲜到”微信公众号，分享对应任务获积分</p>
                    </div> */}
                    <div className="share-way" style={{ marginTop: "23px" }}>
                      <p>方法：</p>
                      <p>复制以下链接分享给好友</p>
                      <div className="share-link">
                        <input type="text" id="codeValue" value={this.getShareUrl()} disabled className="share-input" />
                        <span onClick={this.onCopy}>复制</span>
                      </div>
                    </div>
                  </div>
                </div>
                <img src={close} alt="" onClick={this.hideShareModal} />
              </div>
            }
            {
              jobDetail.positionImgUrls && jobDetail.positionImgUrls.length > 0 &&  <Carousel
                autoplay={true}
                infinite
                dots={false}
                afterChange={this.swiperChange}
                selectedIndex={currentSwiperIndex}
              >
                {
                  jobDetail.positionImgUrls.map((ele: any) => {
                    return <div className="detail-img-box" key={ele} onClick={() => {this.showImgView(ele)}}><img src={ele} alt="" className="detail-img"/></div>
                  })
                }
              </Carousel>
            }
            {
              imgViewShow && <ImgView imgUrl={imgViewUrl} hideImgView={this.hideImgView}/>
            }
          </div>
          <div className="job-detail-info-title">
            <div className="job-detail-info-title-left">
              <div className="job-detail-info-title-jobname">{jobDetail.positionName}</div>
              <div className="job-detail-info-title-companyname">{jobDetail.hiringCommpanyName}</div>
            </div>
            <div className="job-detail-info-title-workprice">{jobDetail.workPrice}{this.unitShow(jobDetail.workPriceUnit)}</div>
          </div>
          <div className="job-detail-info-desc">
            <div className="job-detail-info-desc-title">职位详情</div>
            <div className={(showMoreBtnText === '查看更多' || !showMoreBtnText) ? 'job-detail-info-desc-content' : 'job-detail-info-desc-content-more'}>
              <div className="job-detail-info-desc-content-box" ref={this.jobDesc}>
                {jobDetail.workDesc && <div className="job-detail-info-desc-content-item">
                  <div className="job-detail-info-desc-content-item-title">职位要求</div>
                  <div className="job-detail-info-desc-content-item-desc">{jobDetail.workDesc}</div>
                </div>}
                {jobDetail.workContent && <div className="job-detail-info-desc-content-item">
                  <div className="job-detail-info-desc-content-item-title">工作内容</div>
                  <div className="job-detail-info-desc-content-item-desc">{jobDetail.workContent}</div>
                </div>}
                {jobDetail.workSalary && <div className="job-detail-info-desc-content-item">
                  <div className="job-detail-info-desc-content-item-title">薪资待遇</div>
                  <div className="job-detail-info-desc-content-item-desc">{jobDetail.workSalary}</div>
                </div>}
                {jobDetail.otherDesc && <div className="job-detail-info-desc-content-item">
                  <div className="job-detail-info-desc-content-item-title">其他说明</div>
                  <div className="job-detail-info-desc-content-item-desc">{jobDetail.otherDesc}</div>
                </div>}
              </div>
            </div>
            {
              showMoreBtnText && <div className="job-detail-info-desc-content-showmore" onClick={this.handleShowMore}>
                <span>{showMoreBtnText}</span>
                <img className={(showMoreBtnText === '查看更多' || !showMoreBtnText) ? 'job-detail-info-desc-content-showmore-icon' : 'job-detail-info-desc-content-showless-icon'} src={showMoreIcon} alt=""/>
              </div>
            }
          </div>
          <div className="job-detail-info-address">
            <div className="job-detail-info-address-title">
              工作地点
            </div>
            <div className="job-detail-info-address-desc">
              <div className="job-detail-info-address-desc-icon">
                <img src={jobDetail.positionLogoUrl} alt=""/>
              </div>
              <div className="job-detail-info-address-desc-company">
                <div className="job-detail-info-address-desc-company-name">
                  <span>{jobDetail.hiringCommpanyName}</span>
                  <img src={qiyerenzhen} alt=""/>
                </div>
                <div className="job-detail-info-address-desc-company-address">
                  <img src={positionIcon} alt=""/>
                  <div>{jobDetail.workAddress + jobDetail.workAddressDetail}</div>
                </div>
              </div>
            </div>
            {
              jobDetail.longitude && <div className="job-detail-info-address-map">
                <div id="allmap" className="allmap"></div>
              </div>
            }
          </div>
          <div className="job-detail-info-agent">
            <div className="job-detail-info-agent-avatal">
              <img src={jobDetail.agentHeaderImg || defaultAgentHeaderImg} alt="" className="avatal"/>
              <img src={touxiangrenzhen} alt="" className="renzhen"/>
            </div>
            <div className="job-detail-info-agent-desc">
              <div className="job-detail-info-agent-desc-name">
                <span>{jobDetail.agentName}</span>
              </div>
              <div className="job-detail-info-agent-desc-company">
                <span>{jobDetail.agentCompanyName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="job-detail-bottom">
          <div className="job-detail-btn" onClick={jobDetail.isSignUp === 2 ? () => {} : this.submitSignUp}>
            <span>{jobDetail.isSignUp === 2 ? '已报名' : '立即报名'}</span>
            {jobDetail.isSignUp === 2 && <div className="unavailable"></div>}
          </div>
        </div>
      </div>
    )
  }
}

export default PositionDetail;
