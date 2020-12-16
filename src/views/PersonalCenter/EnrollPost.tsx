import React, { Component } from 'react'
import Layout from "../../layout/Layout";
import './style/EnrollPost.scss';
import JobList from '../../components/JobList';
import { listSignedPositionByPageApi } from '../../api/PersonalCenter';
import NotData from '../../components/NotData'
type stateProps = {
  employeeUserNo: string | null,//	员工编号
  pageNum: number,//	分页页码数
  pageSize: number,//
  listSignedList: any[],
  listTotal: number
}
export default class EnrollPost extends Component<any, stateProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      employeeUserNo: localStorage.getItem("employeeUserNo"),
      pageNum: 1,
      pageSize: 10,
      listSignedList: [],
      listTotal: 0
    }
  }
  componentDidMount() {
    this.listSignedPositionByPage()
  }
  listSignedPositionByPage = async () => {
    const { listSignedList, pageNum } = this.state
    const { data } = await listSignedPositionByPageApi(this.state)
    if (pageNum === 1) {
      this.setState({
        listSignedList: data.pageInfo.list,
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    } else {
      this.setState({
        listSignedList: listSignedList.concat(data.pageInfo.list),
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    }
  }
  render() {
    const { listSignedList, listTotal } = this.state
    return (
      <Layout showTopBar title="已报名岗位" style={{ background: '#f7f7f7' }}>
        {listSignedList.length !== 0 ? <JobList positionList={listSignedList} listTotal={listTotal} getData={this.listSignedPositionByPage} /> : <NotData />}
        {/* {listSignedList.map((item: any, index: number) =>
          <div className="enroll-container" key={'listSigned' + index}>
            <div className="enroll-item">
              <p className="enroll-item-avatal">
                <img src={item.positionLogoUrl || defaultAvatal} alt="" />
              </p>
              <div className="enroll-item-right">
                <div className="enroll-item-right-top">
                  <p>{item.positionName}</p>
                  <span>{item.workPrice}元/时</span>
                </div>
                <p className="enroll-item-right-middle">{item.hiringCommpanyName}</p>
                <div className="enroll-item-right-bottom">
                  <div className="enroll-item-right-bottom-left">
                    <p>
                      <img src={item.agentHeaderImg || defaultAvatal} alt="" />
                    </p>
                    <span>{item.agentName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>)} */}
      </Layout>
    )
  }
}
