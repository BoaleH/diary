import React, { Component } from 'react';
import style from './style/DiaryDetail.module.scss';
import Header from '../../components/Header/Header';

class DiaryDetail extends Component {
  render() {
    return (
      <div className={style.page}>
        <Header headerTitle='下午的事情' headerLeftBtnText="退回" headerRightBtnText="退出" needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={style.paper}>
            <div className={style.paperHeader}>
              <div className={style.diaryTitle}>下午的事情</div>
              <div className={style.diaryDate}>2020年8月3日</div>
            </div>
            <div className={style.diaryContent}>下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情下午的事情</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DiaryDetail;
