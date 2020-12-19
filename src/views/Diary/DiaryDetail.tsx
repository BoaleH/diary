import React, { Component } from 'react';
import style from './style/DiaryDetail.module.scss';
import Header from '../../components/Header/Header';
import { getUrlParam, formatDate } from '../../utils/common';
import { getDiaryDetailApi } from '../../api/diaryApi';
import { message } from 'antd';

type StateType = {
  id: string;
  diaryDetail: any;
};
type PropType = {
  [propName: string]: any;
};
interface DiaryDetail {
  state: StateType;
  props: PropType;
}

class DiaryDetail extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      id: getUrlParam('id') || '',
      diaryDetail: {},
    }
  }

  componentDidMount() {
    this.getDiaryDetail();
  }

  private getDiaryDetail = async () => {
    try {
      const res: any = await getDiaryDetailApi(this.state.id);
      this.setState({
        diaryDetail: res,
      })
    } catch (error) {
      const statusCode = error.response.status || null;
      switch (statusCode) {
        case 400:
          message.error('count/page无效', 2);
          break;
        case 401:
          message.error('JWT无效，JWT空位或者JWT过期了', 2);
          break;
        case 500:
          message.error('内部服务器错误', 2);
          break;
        default:
          message.error('内部服务器错误', 2);
          break;
      }
    }
  }

  render() {
    const { diaryDetail } = this.state;
    return (
      <div className={style.page}>
        <Header headerTitle={diaryDetail.title} showGoBackToMyDiary showLogout needLeftBtnBoxshadow needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={style.paper}>
            <div className={style.paperHeader}>
              <div className={style.diaryTitle}>{diaryDetail.title}</div>
              <div className={style.diaryDate}>{formatDate(diaryDetail.created_at)}</div>
            </div>
            <div className={style.diaryContent}>{diaryDetail.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DiaryDetail;
