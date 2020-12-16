import React, { Component } from 'react';
import { Toast } from "antd-mobile";
import TopBar from '../../components/TopBar'
import nav_arrow from "../../assets/images/Common/nav_arrow.png";
import './style/InterestedMe.scss';
import JobList from '../../components/JobList';
import { interestPositionListApi, applyAllInterviewApi } from '../../api/PersonalCenter';
import NotData from '../../components/NotData'
type StateProps = {
  employeeUserNo: string | null,//	员工编号
  pageNum: number,//	分页页码数
  pageSize: number,//
  interestList: any[],
  listTotal: number,
  whetherCanApply: boolean,
}
class InterestedMe extends Component<any, StateProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      employeeUserNo: localStorage.getItem("employeeUserNo"),
      pageNum: 1,
      pageSize: 10,
      interestList: [],
      listTotal: 0,
      whetherCanApply: false
    }
  }
  componentDidMount() {
    this.interestPositionList()
  }
  interestPositionList = async () => {
    const { pageNum, interestList } = this.state
    const { data } = await interestPositionListApi(this.state)
    if (pageNum === 1) {
      this.setState({
        interestList: data.pageInfo.list,
        listTotal: data.pageInfo.total,
        whetherCanApply: data.whetherCanApply,
        pageNum: pageNum + 1
      })
    } else {
      this.setState({
        interestList: interestList.concat(data.pageInfo.list),
        listTotal: data.pageInfo.total,
        whetherCanApply: data.whetherCanApply,
        pageNum: pageNum + 1
      })
    }
  }
  //全部报名
  applyAllInterview = async () => {
    if (!this.state.whetherCanApply) {
      return;
    }
    const { data } = await applyAllInterviewApi({ employeeUserNo: this.state.employeeUserNo })
    Toast.info(data)
    this.setState({
      pageNum: 1,
      interestList: [],
    }, () => {
      this.interestPositionList()
    })
  }
  render() {
    const { goBack } = this.props
    const { interestList, listTotal, whetherCanApply } = this.state
    return (
      <div className="interested-layout">
        <TopBar leftSlot={nav_arrow} centerSlot='对我感兴趣' goBack={goBack} />
        <div className="content">
          {interestList.length !== 0 ? <JobList positionList={interestList} listTotal={listTotal} getData={this.interestPositionList} /> : <NotData />}
          {/* {interestList.map((item: any, index: number) =>
            <div className="enroll-container" key={'postItem' + index}>
              <div className="enroll-item">
                <p className="enroll-item-avatal">
                  <img src={item.positionLogoUrl || defaultAvatal} alt="" />
                </p>
                <div className="enroll-item-right">
                  <div className="enroll-item-right-top">
                    <p>{item.positionName}</p>
                    <span>{item.workPrice}元/时</span>
                  </div>
                  <p className="enroll-item-right-middle">{item.companyName}</p>
                  <div className="enroll-item-right-bottom">
                    <div className="enroll-item-right-bottom-left">
                      <p>
                        <img src={item.agentHeaderImg || defaultAvatal} alt="" />
                      </p>
                      <span>{item.agentName}</span>
                    </div>
                    {item.whetherApply === '2' && <p className="enroll-item-right-bottom-default">已报名</p>}
                    {item.whetherApply === '1' && <p className="enroll-item-right-bottom-active">邀约</p>}
                  </div>
                </div>
              </div>
            </div>)} */}
        </div>
        {interestList.length !== 0 && <div className="signup-btn">
          <p style={{ opacity: whetherCanApply ? '1' : '0.5' }} onClick={this.applyAllInterview}>全部报名</p>
        </div>}
      </div>
    );
  }
}

export default InterestedMe;
