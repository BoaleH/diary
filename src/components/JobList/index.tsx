import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { ListView } from "antd-mobile";
import './index.scss'
import defaultAvatal from '../../assets/images/PersonalCenter/avatal.png';

import { unitShow } from '../../utils/common'
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1: any, row2: any) => row1 !== row2,
});
class Index extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }
  onEndReached = () => {
    if (this.props.positionList.length === this.props.listTotal) {
      return;
    }
    this.props.getData()
  };
  onJump = (item: any) => {
    this.props.history.push('/PositionDetail?positionNo=' + item.positionNo)
  }
  private row = (item: any, sectionID?: any, rowID?: any) => {
    return (
      <div className="enroll-container2" key={rowID} onClick={() => this.onJump(item)}>
        <div className="enroll-item">
          <p className="enroll-item-avatal">
            <img src={item.positionLogoUrl || defaultAvatal} alt="" />
          </p>
          <div className="enroll-item-right">
            <div className="enroll-item-right-top">
              <p>{item.positionName}</p>
              <span>{item.workPrice}{unitShow(item.workPriceUnit)}</span>
            </div>
            <p className="enroll-item-right-middle">{item.hiringCommpanyName || item.companyName}</p>
            <div className="enroll-item-right-bottom">
              <div className="enroll-item-right-bottom-left">
                <p>
                  <img src={item.agentHeaderImg || defaultAvatal} alt="" />
                </p>
                <span>{item.agentName}</span>
              </div>
              {item.whetherApply === 2 && <p className="enroll-item-right-bottom-default">已报名</p>}
              {item.whetherApply === 1 && <p className="enroll-item-right-bottom-active">邀约</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { positionList } = this.props
    return (
      <Fragment>
        <ListView
          dataSource={dataSource.cloneWithRows(positionList)}
          // renderFooter={() => <div style={{ textAlign: "center" }}>{positionList.length === this.props.listTotal && positionList.length > 10 ? "我是有底线的~" : positionList.length === 0 ? "暂无数据" : ""}</div>}
          renderRow={(item: any) => this.row(item)}
          onEndReachedThreshold={10}
          onEndReached={this.onEndReached} //上拉加载
          pageSize={10}
        />
      </Fragment>
    )
  }
}

export default withRouter(Index)
