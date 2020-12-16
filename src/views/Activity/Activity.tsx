import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";
import { Drawer, Carousel, Toast } from "antd-mobile";
import Layout from "../../layout/Layout";
import { connect } from "react-redux";
import { wxgetData, wxShareDate } from "../../utils/wxShare";
import activityApi from "../../api/activityApi";
import { changeLoginPopupShow } from "../../redux/action/CommonAction";
import "./style/Activity.scss";
import activityHead from "../../assets/images/Activity/activityHead.png";
import suspensionRules from "../../assets/images/Activity/suspensionRules.png";
import activityBg from "../../assets/images/Activity/activityBg.png";
import tasklist from "../../assets/images/Activity/tasklist.png";
import rankingImg from "../../assets/images/Activity/weekRanking.png";
import integral from "../../assets/images/Activity/integral.png";
import cup1 from "../../assets/images/Activity/cup1.png";
import cup2 from "../../assets/images/Activity/cup2.png";
import cup3 from "../../assets/images/Activity/cup3.png";
import photo from "../../assets/images/Activity/photo.png";
import improvedata from "../../assets/images/Activity/improvedata.png";
import taskbg from "../../assets/images/Activity/taskbg.png";
import taskclose from "../../assets/images/Activity/taskclose.png";
import share2 from "../../assets/images/Activity/share2.png";
import close from "../../assets/images/icon_close.png";

const rulesList = [
  {
    titile: "一、活动规则:",
    content: [{ rule: "用户完成平台任务，获得对应的活动积分和奖品。" }],
  },
  {
    titile: "二、活动时间:",
    content: [{ rule: "2020.11.9~2020.12.20" }],
  },
  {
    titile: "三、奖励说明:",
    content: [
      { rule: "1、积分奖励:" },
      { rule: "奖励说明:每周积分排行第一名获得30元无门槛话费充值券，第二到第五名将获得10元无门槛话费充值券。注:同积分情况，将根据积分获取时间优先排序。" },
      { rule: "附注:当自然周用户积分≥1200分人数大于等于10人，周排行活动生效;若人数不足10人，则不开奖。每周一零点，周积分从零重新计算。" },
      { rule: "获奖及兑奖:每周一中午12:00，通过公众号公布上周中奖名单，并由客服对联系中奖用户兑奖。" },
      { rule: "2、入职奖励:" },
      { rule: "随机奖励:活动期间，通过平台成功入职的用户，将有机会抽取价值2099元的任天堂Ninetendo switch游戏机一部。" },
      { rule: "话费奖励：活动期间，通过平台成功入职的用户，将获得150元无门槛话费充值券。" },
      { rule: "附注：若入职人数不足10人，则不抽取随机奖励；" },
      { rule: "获奖及兑奖：2021年1月11日上午10:00，通过公众号公布获奖名单，并在3个工作日内，由客服人员联系中奖人员兑奖。" },
    ],
  },
  {
    titile: "四、积分任务:",
    content: [{ rule: "1、完成手机注册登录;" }, { rule: "2、完善个人信息;" }, { rule: "3、线下面试打卡;" }, { rule: "4、邀请好友注册（分享指定任务给朋友，获得对应积分);" }, { rule: "5、邀请好友线下面试打卡（分享指定任务给朋友，获得对应积分);" }, { rule: "( 更多任务见活动任务列表 )" }, { rule: "本活动最终解释权归平台所有。" }],
  },
];
const winnersList = [
  { phone: "189****6842", num: "20" },
  { phone: "136****0662", num: "20" },
  { phone: "188****6854", num: "20" },
  { phone: "135****2495", num: "20" },
  { phone: "132****0412", num: "20" },
];
const mapStateToProps = (state: any) => {
  return state;
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    LoginPopupShow: (status: any) => dispatch(changeLoginPopupShow(status)),
  };
};
let timer: any = null;
class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      openTaskStatus: false,
      openRulesStatus: false,
      rankingStatus: true,
      linkVulue: "", //非微信浏览器分享链接
      shareStatus: false,
      rankingType: "all",
      taskList: [], //任务列表
      rankingList: [], //排行榜列表
      modalStatus: false,
      rankingInfo: 0, //当前排名
      employeeUserNo: localStorage.getItem("employeeUserNo"),
      phone: localStorage.getItem("phone"),
      tableMargin: 0,
      curIndex: 0,
      remainder: 0,
      isAnimate: false,
      shareOptions: {},
    };
  }
  componentDidMount() {
    const invateCode = localStorage.getItem("ownerInvateCode");
    Promise.all([wxgetData(), this.getTaskList()]).then(() => {
      wxShareDate({
        title: this.state.shareOptions.mainTitle, // 分享标题，需要在这里改成你从后台获取的数据
        desc: this.state.shareOptions.secondTitle,
        imgUrl: "https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/20201102/one_share_icon.png", // 分享图标，需要在这里改成你从后台获取的数据（URL）
        link: window.location.href.split("?")[0] + "?invateCode=" + invateCode,
      });
    });
    this.weekIntegralRankingList();
  }
  //获取任务列表
  getTaskList = async () => {
    const { employeeUserNo } = this.state;
    const { data } = await activityApi.getTaskList({ employeeUserNo });
    this.setState({
      taskList: data,
      shareOptions: data.filter((item: any) => item.taskNo === "10003")[0],
    });
  };
  //打开抽屉
  openDrawer = (type?: any) => {
    this.setState(
      {
        openRulesStatus: type,
      },
      () => {
        this.setState({
          openStatus: type, //抽屉状态
        });
      },
    );
  };
  changeOpenTask = () => {
    this.setState({
      openTaskStatus: !this.state.openTaskStatus, //抽屉状态
    });
  };
  //周排行
  weekIntegralRankingList = async () => {
    const { employeeUserNo } = this.state;
    const params = {
      pageNum: 1,
      pageSize: 10,
      employeeUserNo: employeeUserNo,
    };
    const { data } = await activityApi.weekIntegralRankingList(params);
    let list = data.pageInfo.list;
    this.setState(
      {
        rankingList: list,
        rankingInfo: data.ranking,
        remainder: list.length % 5,
      },
      () => {
        if (this.state.remainder !== 0 && this.state.rankingList.length > 5) {
          let _arr = [];
          for (let index = 0; index < 5 - this.state.remainder; index++) {
            _arr.push({});
          }
          this.setState(
            {
              rankingList: list.concat(_arr),
            },
            () => {
              this.autoplay();
            },
          );
        } else {
          this.autoplay();
        }
      },
    );
  };
  //总排行
  totalIntegralRankingList = async () => {
    const { employeeUserNo } = this.state;
    const params = {
      pageNum: 1,
      pageSize: 20,
      employeeUserNo: employeeUserNo,
    };
    const { data } = await activityApi.totalIntegralRankingList(params);
    let list = data.pageInfo.list;
    this.setState(
      {
        rankingList: list,
        rankingInfo: data.ranking,
        remainder: list.length % 5,
      },
      () => {
        if (this.state.remainder !== 0) {
          let _arr = [];
          for (let index = 0; index < 5 - this.state.remainder; index++) {
            _arr.push({});
          }
          this.setState(
            {
              rankingList: list.concat(_arr),
            },
            () => {
              this.autoplay();
            },
          );
        } else {
          this.autoplay();
        }
      },
    );
  };
  nullFuction = () => { }; //取消阴影关闭抽屉
  //排行榜切换
  changeRanking = (type: any) => {
    if (this.state.rankingType === type) {
      return;
    }
    this.setState({
      rankingType: type,
      rankingStatus: !this.state.rankingStatus,
    });
    if (type === "all") {
      this.totalIntegralRankingList();
    } else {
      this.weekIntegralRankingList();
    }
  };

  //领取任务
  receiveTask = async (employeeUserNo: any, taskNo: any) => {
    return await new Promise(async (resolve, reject) => {
      const { data } = await activityApi.receiveTask(employeeUserNo, taskNo);
      resolve(data);
    });
  };
  taskChange = async (obj: any) => {
    const invateCode = localStorage.getItem("ownerInvateCode");
    const token = localStorage.getItem("token");
    if (!token) {
      // this.props.LoginPopupShow(true);
      this.props.history.push('/Login');
      return;
    }
    if (obj.taskType === 4) {
      return;
    }
    const { employeeUserNo } = this.state;
    const receiveRecordNo = await this.receiveTask(employeeUserNo, obj.taskNo);
    if (obj.taskNo === "10002") {
      this.props.history.push("/PersonalInfo?modifyPersonalTaskReceiveNo=" + receiveRecordNo);
      return;
    }
    if (obj.taskType === 2) {
      if (obj.taskButtonName === "上传审核") {
        this.props.history.push("/UploadMessage?receiveRecordNo=" + receiveRecordNo + "&taskNo=" + obj.taskNo);
        return;
      } else {
        this.getTaskList();
        return;
      }
    }
    if (obj.taskType === 1) {
      //分享
      const ua = window.navigator.userAgent.toLowerCase();
      //如果不在微信浏览器内，微信分享也没意义了对吧？这里判断一下
      if (ua.indexOf("micromessenger") < 0) {
        if (obj.taskNo === "10003") {
          this.setState({
            linkValue: window.location.href.split("?")[0] + "?registerTaskReceiveNo=" + receiveRecordNo + "&invateCode=" + invateCode,
          });
        }
        if (obj.taskNo.indexOf("YQ") !== -1) {
          const punchTaskReceiveNo = await this.receiveTask(employeeUserNo, obj.taskNo);
          const registerTaskReceiveNo = await this.receiveTask(employeeUserNo, "10003");
          this.setState({
            linkValue: window.location.href.split("?")[0] + "?registerTaskReceiveNo=" + registerTaskReceiveNo + "&invateCode=" + invateCode + "&punchTaskReceiveNo=" + punchTaskReceiveNo,
          });
        }
        this.onCloseModal(true);
      } else {
        let share_options;
        if (obj.taskNo === "10003") {
          //分享邀请注册
          share_options = {
            desc: obj.secondTitle,
            title: obj.mainTitle, // 分享标题，需要在这里改成你从后台获取的数据
            imgUrl: "https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/20201102/one_share_icon.png", // 分享图标，需要在这里改成你从后台获取的数据（URL）
            link: window.location.href.split("?")[0] + "?registerTaskReceiveNo=" + receiveRecordNo + "&invateCode=" + invateCode,
          };
          // alert(JSON.stringify(share_options));
        }
        if (obj.taskNo.indexOf("YQ") !== -1) {
          //分享邀请打卡
          const punchTaskReceiveNo = await this.receiveTask(employeeUserNo, obj.taskNo);
          const registerTaskReceiveNo = await this.receiveTask(employeeUserNo, "10003");
          share_options = {
            desc: obj.secondTitle,
            title: obj.mainTitle, // 分享标题，需要在这里改成你从后台获取的数据
            imgUrl: "https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/20201102/one_share_icon.png", // 分享图标，需要在这里改成你从后台获取的数据（URL）
            link: window.location.href.split("?")[0] + "?registerTaskReceiveNo=" + registerTaskReceiveNo + "&invateCode=" + invateCode + "&punchTaskReceiveNo=" + punchTaskReceiveNo,
          };
          // alert(JSON.stringify(share_options));
        }
        wxShareDate(share_options);
        //如果是分享类任务这弹出提示
        this.hideModal(true); //弹窗方法
      }
    }
  };
  hideModal = (val: Boolean) => {
    this.setState({
      modalStatus: val,
    });
  };
  onCloseModal = (val: Boolean) => {
    this.setState({
      shareStatus: val,
    });
  };
  autoplay = () => {
    if (this.state.rankingList.length <= 5) {
      return;
    }
    let i = 0;
    this.setState({
      isAnimate: false,
      tableMargin: -0,
    });
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      this.setState({
        isAnimate: true,
      });
      if (-this.state.tableMargin === this.state.rankingList.length * 58 - 290) {
        setTimeout(() => {
          i = 0;
          this.setState({
            isAnimate: false,
            tableMargin: 0,
          });
        }, 30);
      }
      i++;
      this.setState({
        tableMargin: -290 * i,
      });
    }, 3000);
  };
  jumpMyaccount = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // this.props.LoginPopupShow(true);
      this.props.history.push('/Login');
      return;
    } else {
      this.props.history.push("/Myaccount");
    }
  };
  componentWillUnmount() {
    clearInterval(timer);
  }
  taskBox = () => {
    const { taskList } = this.state;
    return (
      <div className="task-lists">
        <div className="task-bg">
          <img src={taskbg} alt="" />
          <img src={taskclose} alt="" onClick={this.changeOpenTask} className="task-close-btn" />
        </div>
        <div className="task-content-bg">
          {taskList.length > 0 &&
            taskList.map((item: any, index: any) => {
              return (
                <div className="task-content" key={"task" + index}>
                  <div className="left-content">
                    <img src={item.taskIconUrl ? item.taskIconUrl : improvedata} alt="" />
                  </div>
                  <div className="center-content">
                    <p>{item.taskName}</p>
                    <div className="jifen-box">
                      <span className="jifen-info">+{item.taskIntegral}积分</span>
                      {item.taskType === 2 && <p className="center-location">地址: {item.taskAddress}</p>}
                    </div>
                  </div>
                  <div className={item.completeStatus === 1 || item.taskType === 4 ? "right-content right-content-disabled" : "right-content"}>
                    <p onClick={item.completeStatus === 1 ? () => { } : () => this.taskChange(item)}>{item.taskButtonName}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  rulesBox = () => (
    <div className="activity-rules">
      <div className="rules-header">
        <p>活动规则</p>
      </div>
      <div className="rules-box">
        {rulesList.map((item: any, index: any) => {
          return (
            <div className="rules-content" key={"content" + index}>
              <p>{item.titile}</p>
              <ul>
                {item.content.map((childItem: any, childIndex: any) => {
                  return <li key={"rule" + childIndex}>{childItem.rule}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
  render() {
    const { isAnimate, tableMargin, openStatus, shareStatus, linkValue, openRulesStatus, openTaskStatus, modalStatus, rankingInfo, rankingList, phone } = this.state;
    return (
      <Drawer sidebar={this.taskBox()} open={openTaskStatus} onOpenChange={this.changeOpenTask} position="bottom">
        <Layout showTopBar={false} style={{ backgroundColor: "#fb3c5c" }} showBottomBar>
          <div className="activityContainer">
            <div className="bg">
              <img src={activityBg} alt="" />
              {true && (
                <div className="bg-tip">
                  <Carousel vertical dots={false} autoplay infinite>
                    {winnersList.map((item: any, index: Number) => {
                      return (
                        <div className="my-carousel" key={"carousel" + index}>
                          <img src={activityHead} alt="" className="my-carousel-photo" />
                          <p className="my-carousel-tip">
                            恭喜{item.phone}获得<span>{item.num}元</span>话费!!
                          </p>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              )}
            </div>
            <div className="ranking-box">
              <div className="ranking-list">
                <img src={rankingImg} alt="" />
                {/* <div className="swick-box">
                  <p className={rankingStatus ? "active" : ""} onClick={() => this.changeRanking("all")}>
                    总排行榜
                  </p>
                  <p className={rankingStatus ? "active" : ""} onClick={() => this.changeRanking("week")}>
                    周排行榜
                  </p>
                </div> */}
                <div className="ranking-table">
                  <div className="table-header">
                    <p>排名</p>
                    <p>手机号</p>
                    <p>累计积分</p>
                  </div>
                  <div className="table-list">
                    <div className="table-list-box" style={{ top: (tableMargin / 375) * 100 + "vw", marginTop: 0, transitionDuration: isAnimate ? ".3s" : "0s" }}>
                      {/* {rankingList.length > 5 &&
                        rankingList.slice(rankingList.length - 5).map((item: any, index: any) => {
                          return <ListItem item={item} index={rankingList.length - 5 + index} key={"ListItem" + index}></ListItem>;
                        })} */}
                      {rankingList.map((item: any, index: any) => {
                        return <ListItem item={item} index={index} key={"ListItem" + index}></ListItem>;
                      })}
                      {/* {rankingList.length > 5 &&
                        rankingList.slice(0, 5).map((item: any, index: any) => {
                          return <ListItem item={item} index={index} key={"ListItem" + index}></ListItem>;
                        })} */}
                    </div>
                    {rankingList.length === 0 && <p style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>暂无数据</p>}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "16px", width: "100%" }}></div>
            <div className="header">
              <p className="header-left" onClick={this.jumpMyaccount}>
                <img src={activityHead} alt="" />
              </p>
              <div className="header-right">
                {phone ? <p>Hi,{phone}</p> : <p onClick={this.jumpMyaccount}>未登录</p>}
                {rankingInfo !== 0 && <p>您当前排名{rankingInfo}名，继续努力加油，冲鸭！！</p>}
              </div>
            </div>
            <div className="suspension">
              <img src={suspensionRules} alt="" onClick={() => this.openDrawer(true)} />
              <img src={tasklist} alt="" onClick={this.changeOpenTask} />
            </div>
            {modalStatus && <Portals modalClick={this.hideModal} />}
            {openRulesStatus && <RulesPortals sliderContent={this.rulesBox()} openStatus={openStatus} openDrawer={this.openDrawer} />}
            {shareStatus && <SharePortals linkValue={linkValue} onCloseModal={this.onCloseModal} />}
          </div>
        </Layout>
      </Drawer>
    );
  }
}
class RulesPortals extends Component<any, any> {
  changeOpen = () => {
    this.props.openDrawer(false);
  };
  render() {
    const { sliderContent, openStatus } = this.props;
    return createPortal(
      <Drawer sidebar={sliderContent} open={openStatus} onOpenChange={this.changeOpen} position="bottom">
        {""}
      </Drawer>,
      document.body,
    );
  }
}
class SharePortals extends Component<any, any> {
  onClose = () => {
    this.props.onCloseModal(false);
  };
  onCopy = () => {
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
  };
  render() {
    const { linkValue = window.location.href } = this.props;
    return createPortal(
      <div className="myModalShare">
        <div className="share-box">
          <p>分享赚积分</p>
          <div className="share-content">
            <div className="share-way">
              <p>方法一：</p>
              <p>关注“寻工鸟”微信公众号，分享对应任务获积分</p>
            </div>
            <div className="share-way" style={{ marginTop: "23px" }}>
              <p>方法二：</p>
              <p>复制以下链接，分享给好友赚积分</p>
              <div className="share-link">
                <input type="text" id="codeValue" value={linkValue} disabled className="share-input" />
                <span onClick={this.onCopy}>复制</span>
              </div>
            </div>
          </div>
        </div>
        <img src={close} alt="" onClick={this.onClose} />
      </div>,
      document.body,
    );
  }
}
class Portals extends Component<any, any> {
  showClick = () => {
    this.props.modalClick(false);
  };
  render() {
    return createPortal(
      <div className="myModal" onClick={this.showClick}>
        <img src={share2} alt="" className="modalArrow" />
        <div className="modalContent">
          <div className="modalText">
            <p>请点击右上角，将它发送给指定朋友或分享到朋友圈</p>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}

function ListItem({ item, index }: { item: any; index: any }) {
  if (index === 0) {
    return (
      <div className="list-header header-bg1">
        <p className="cupImg">
          <img src={cup1} alt="" />
        </p>
        <p className="photo">
          <img src={photo} alt="" />
          {item.phone}
        </p>
        <p className="integral">
          <img src={integral} alt="" />
          {item.integralTotal}
        </p>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="list-header header-bg2">
        <p className="cupImg">
          <img src={cup2} alt="" />
        </p>
        <p className="photo">
          <img src={photo} alt="" />
          {item.phone}
        </p>
        <p className="integral">
          <img src={integral} alt="" />
          {item.integralTotal}
        </p>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="list-header header-bg3">
        <p className="cupImg">
          <img src={cup3} alt="" />
        </p>
        <p className="photo">
          <img src={photo} alt="" />
          {item.phone}
        </p>
        <p className="integral">
          <img src={integral} alt="" />
          {item.integralTotal}
        </p>
      </div>
    );
  }
  const _content = item.phone && (
    <Fragment>
      <p className="cupImg">{index + 1}</p>
      <p className="photo">
        <img src={photo} alt="" />
        {item.phone}
      </p>
      <p className="integral">
        <img src={integral} alt="" />
        {item.integralTotal}
      </p>
    </Fragment>
  );
  return <div className="list-header header-bg4">{_content}</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
