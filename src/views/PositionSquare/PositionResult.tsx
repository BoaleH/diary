import React, { Component } from 'react'
import JobList from '../../components/JobList'
import './style/PositionResult.scss'
import { getUrlParam } from '../../utils/common'
import positionSquareApi from "../../api/positionSquareApi";
import NotData from '../../components/NotData';
import { pageScroll } from "../../utils/pageScroll";
export default class PositionResult extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      cityName: localStorage.getItem('cityName') || '深圳',
      positionOrCompany: getUrlParam('positionOrCompany') || '',
      longitude: '',
      latitude: '',
      queryType: 2,
      pageNum: 1,
      pageSize: 15,
      list: [],
      listTotal: 0
    }
  }
  componentDidMount() {
    this.getdatalist();
    pageScroll();
  }
  getdatalist = async () => {
    const { pageNum, list } = this.state
    const { data } = await positionSquareApi.listPositionByPage(this.state)
    if (pageNum === 1) {
      this.setState({
        list: data.pageInfo.list,
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    } else {
      this.setState({
        list: list.concat(data.pageInfo.list),
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    }
  }
  backPage = () => {
    this.props.history.replace('/')
  }
  render() {
    const { list, cityName, listTotal, positionOrCompany } = this.state
    return (
      <div className="position-layout">
        <div className="position-header">
          <div className="position-header-top">
            <p className="position-header-top-city">{cityName}</p>
            <p className="position-header-top-search" onClick={() => this.props.history.push('/PositionSearch')}><input type="text" readOnly value={positionOrCompany} placeholder="富士康电子厂" /></p>
            <p className="position-header-top-back" onClick={this.backPage}>取消</p>
          </div>
        </div>
        <div className="content">
          {list.length !== 0 ? <JobList positionList={list} listTotal={listTotal} getData={this.getdatalist}></JobList> : <NotData />}
        </div>
      </div>
    )
  }
}
