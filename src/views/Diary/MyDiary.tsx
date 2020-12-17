import React, { Component } from 'react';
import style from './style/MyDiary.module.scss';
import Header from '../../components/Header/Header';

class MyDiary extends Component {
  render() {
    return (
      <div className={style.page}>
        <Header headerTitle='我的日记' headerLeftBtnText="陈奕迅" headerRightBtnText="退出" needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={`${style.card} ${style.add}`}>+</div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
          <div className={`${style.card} ${style.diaryCard}`}>
            <div className={style.diaryDate}>2020年8月3日</div>
            <div className={style.diaryTitle}>下午的事情</div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyDiary;
