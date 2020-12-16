import React, { Component } from "react";
import Layout from "../../layout/Layout";
import { ListView } from "antd-mobile";
import activityApi from "../../api/activityApi";
import "./style/Myaccount.scss";
import leftIcon_while from "../../assets/images/PersonalCenter/leftIcon_while.png";
import avatal from "../../assets/images/PersonalCenter/avatal.png";
import improvedata from "../../assets/images/Activity/improvedata.png";

export default class Myaccount extends Component<any, any> {
  constructor(props: any) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      isLoading: true,
      height: 387,
      pageNum: 1,
      pageSize: 10,
      total: null,
      rankList: [],
      totalIntegral: 0,
      weekTotalIntegral: 0,
      inviteTotal: 0,
      phone: localStorage.getItem("phone"),
      employeeUserNo: localStorage.getItem("employeeUserNo"),
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const { pageNum, rankList, dataSource, employeeUserNo } = this.state;
    const params = {
      pageNum,
      pageSize: 10,
      employeeUserNo,
    };
    const res: any = await activityApi.personalDetail(params);
    if (res && res.code === 0) {
      const { data } = res;
      this.setState({
        totalIntegral: data.totalIntegral,
        weekTotalIntegral: data.weekTotalIntegral,
        inviteTotal: data.inviteTotal,
      });
      if (pageNum === 1) {
        this.setState({
          rankList: data.pageInfo.list,
          dataSource: dataSource.cloneWithRows(data.pageInfo.list),
          pageNum: pageNum + 1,
          isLoading: false,
          total: data.pageInfo.total,
        });
      } else {
        this.setState(
          {
            rankList: rankList.concat(data.pageInfo.list),
            total: data.pageInfo.total,
          },
          () => {
            this.setState({
              dataSource: dataSource.cloneWithRows(this.state.rankList),
              pageNum: pageNum + 1,
              isLoading: false,
            });
          },
        );
      }
    }
  };
  onEndReached = () => {
    if (this.state.rankList.length === this.state.total) {
      this.setState({
        isLoading: false,
      });
      return;
    }
    this.getData();
  };
  private row = (item: any, sectionID?: any, rowID?: any) => {
    return (
      <div className="record-list-item" key={rowID}>
        <div className="list-item-img">
          <img src={improvedata} alt="" />
        </div>
        <div className="list-item-box">
          <p className="item-box-top">{item.taskName}</p>
          <div className="item-box-bottom">
            <p>+{item.integral}积分</p>
            <p>{item.integralCreateTime}</p>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { history } = this.props;
    const { phone, totalIntegral, weekTotalIntegral, inviteTotal, total, rankList } = this.state;
    return (
      <Layout>
        <div className="myaccount-container">
          <div className="container-box">
            <div className="header-arrow" onClick={() => history.goBack()}>
              <img src={leftIcon_while} alt="" />
            </div>
            <div className="header-info">
              <div className="header-leftbox">
                {phone ? <p className="header-mobile">Hi,{phone}</p> : <p className="header-mobile">未登录</p>}
                {/* <p className="header-ranking">您当前排名25名，继续努力加油，冲鸭！！</p> */}
              </div>
              <div className="header-avatal">
                <img src={avatal} alt="" />
              </div>
            </div>
            <div className="ranking-record">
              <div className="record-box">
                <div className="record-item">
                  <p>{totalIntegral}</p>
                  <p>当前总积分</p>
                </div>
                <div className="record-item">
                  <p>{weekTotalIntegral}</p>
                  <p>当前周积分</p>
                </div>
                <div className="record-item">
                  <p>{inviteTotal}</p>
                  <p>已邀好友</p>
                </div>
              </div>
            </div>
            <div className="record-list">
              <p className="record-list-tltie">积分记录</p>
              <ListView
                dataSource={this.state.dataSource}
                renderFooter={() => <div style={{ textAlign: "center" }}>{this.state.isLoading ? "加载中..." : rankList.length === total && rankList.length > 10 ? "我是有底线的~" : rankList.length === 0 ? "暂无数据" : ""}</div>}
                renderRow={(item: any) => this.row(item)}
                onEndReachedThreshold={10}
                onEndReached={this.onEndReached} //上拉加载
                pageSize={10}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
