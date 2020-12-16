import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import TabBar from '../../components/TabBar'
import JobList from '../../components/JobList'
import './style/PositionSquare.scss'
import positionSquareApi from "../../api/positionSquareApi";
import NotData from '../../components/NotData'
import { pageScroll } from "../../utils/pageScroll";

const tabmenu = [
  {
    imgDefault: require("../../assets/images/Tabbar/position.png"),
    imgActive: require("../../assets/images/Tabbar/position_active.png"),
    title: '职位广场',
    link: '/',
    linkType: "internaLink",
  },
  {
    imgDefault: require("../../assets/images/Tabbar/integral.png"),
    imgActive: require("../../assets/images/Tabbar/integral_active.png"),
    title: '积分活动',
    link: "/Activity",
    linkType: "internaLink",
  },
  {
    imgDefault: require("../../assets/images/Tabbar/user.png"),
    imgActive: require("../../assets/images/Tabbar/user_active.png"),
    title: '个人中心',
    link: "/PersonalCenter",
    linkType: "internaLink",
  },
];
type StateType = {
  queryType: number;
  longitude: string;//	经度
  latitude: string;//	纬度
  positionOrCompany: string;//	岗位或公司名称
  cityName: string;//	城市名称
  pageNum: number;//	分页页码数
  pageSize: number;//	分页每页大小数
  listPosition: any[];
  cityList: any[];
  cityStatus: boolean;
  listTotal: number;
}
export default class PositionSquare extends Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      queryType: 0,
      longitude: '', //经度
      latitude: '', //纬度
      positionOrCompany: '', //岗位或公司名称
      cityName: localStorage.getItem('cityName') || '深圳', //城市名称
      pageNum: 1, //分页页码数
      pageSize: 5, //分页每页大小数
      listPosition: [],
      cityList: [],
      cityStatus: false,
      listTotal: 0
    }
  }
  componentDidMount() {
    this.listPositionByPage()
    this.getCityList()
    pageScroll()
  }
  //获取城市
  getCityList = async () => {
    const { data } = await positionSquareApi.getCityList()
    this.setState({
      cityList: data
    })
  }
  //列表请求
  listPositionByPage = async () => {
    const { listPosition, pageNum } = this.state
    const { data } = await positionSquareApi.listPositionByPage(this.state)
    if (pageNum === 1) {
      this.setState({
        listPosition: data.pageInfo.list,
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    } else {
      this.setState({
        listPosition: listPosition.concat(data.pageInfo.list),
        listTotal: data.pageInfo.total,
        pageNum: pageNum + 1
      })
    }

  }
  changeType = (type: number) => {
    this.setState({
      listPosition: [],
      queryType: type,
      pageNum: 1,
    }, () => {
      this.listPositionByPage()
    })
  }
  selectCity = async (city?: string) => {
    if (city) {
      localStorage.setItem('cityName', city)
      this.setState({
        listPosition: [],
        pageNum: 1,
        cityName: city
      }, () => {
        this.listPositionByPage()
      })
    }
    this.setState({
      cityStatus: false
    })
  }
  jumpPage = () => {
    this.props.history.push('/PositionSearch')
  }
  render() {
    let { queryType, listPosition, listTotal, cityList, cityName, cityStatus } = this.state
    return (
      <div className="position-layout">
        <div className="position-header">
          <div className="position-header-top">
            <p className="position-header-top-city" onClick={() => { this.setState({ cityStatus: true }) }}>{cityName}</p>
            <p className="position-header-top-search" onClick={this.jumpPage}><input type="text" placeholder="富士康电子厂" /></p>
          </div>
          <div className="position-header-tab">
            <p className={queryType === 0 ? "position-header-tab-active" : ''} onClick={() => this.changeType(0)}>推荐职位</p>
            <p className={queryType === 1 ? "position-header-tab-active" : ''} onClick={() => this.changeType(1)}>最新发布</p>
          </div>
        </div>
        <div className="content">
          {listPosition.length !== 0 ? <JobList positionList={listPosition} listTotal={listTotal} getData={this.listPositionByPage} /> : <NotData />}
          {/* {listPosition.map((item: any, index: number) => {
            return (
              <div className="enroll-container" key={'position' + index} onClick={() => { history.push('/JobDetail') }}>
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
                          <img src={item.agentHeaderImg} alt="" />
                        </p>
                        <span>{item.agentName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
          })} */}
        </div>
        {cityStatus && <CityPortals selectCity={this.selectCity} currentCity={cityName} citySelectList={cityList} />}
        < TabBar menu={tabmenu} />
      </div>
    )
  }
}
class CityPortals extends Component<any, any> {

  selectCity = (item?: any) => {
    this.props.selectCity(item);
  }
  render() {
    const { citySelectList, currentCity } = this.props
    return createPortal(
      <div className='cityModal' onClick={() => this.selectCity('')}>
        <div className='cityModal-content'>
          {
            citySelectList.map((item: any, index: number) => {
              return <p className={currentCity === item.businessName ? "cityModal-content-activeP" : ''} onClick={() => this.selectCity(item.businessName)} key={'city' + index}>{item.businessName}</p>
            })
          }
        </div>
      </div>,
      document.body,
    );
  }
}