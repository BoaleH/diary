import React, { Component } from 'react'
import './style/PositionSerach.scss';
import { pageScroll } from "../../utils/pageScroll";
export default class PositionSearch extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      cityName: localStorage.getItem('cityName') || '深圳',
      positionOrCompany: ''
    }
  }
  backPage = () => {
    this.props.history.push('/')
  }
  componentDidMount() {
    this.onClickSearch();
    pageScroll();
  }
  onSubmitSearch = (e: any) => {
    e && e.preventDefault()
    this.props.history.push('/PositionResult?positionOrCompany=' + this.state.positionOrCompany)
  }
  inputChange = (e: any) => {
    this.setState({
      positionOrCompany: e.target.value
    })
  }
  onClickSearch = () => {
    let _ref: any = this.refs.input
    if (_ref) {
      _ref.focus();
    }
  }
  render() {
    const { cityName, positionOrCompany } = this.state
    return (
      <div className="positionSearch-layout">
        <div className="positionSearch-header">
          <div className="positionSearch-header-top">
            <div className="positionSearch-header-top-city">{cityName}</div>
            <div className="positionSearch-header-top-search" onClick={this.onClickSearch}>
              <form action="" onSubmit={this.onSubmitSearch}>
                <input type="search" ref='input' value={positionOrCompany} onChange={(e) => this.inputChange(e)} placeholder="富士康电子厂" />
              </form>
            </div>
            <div className="positionSearch-header-top-back" onClick={this.backPage}>取消</div>
          </div>
        </div>
      </div>
    )
  }
}
