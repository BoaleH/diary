import React, { Component } from 'react';
import style from './style/CreateDiary.module.scss';
import Header from '../../components/Header/Header';
import InputItem from '../../components/InputItem/InputItem';

class CreateDiary extends Component {
  render() {
    return (
      <div className={style.page}>
        <Header headerTitle='下午的事情' headerLeftBtnText="退回" headerRightBtnText="退出" needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={style.paper}>
            <div className={style.titleInput}>
              <InputItem inputItemTitle="标题" InputItemPlaceholder="日记条目标题..." inputType="text" titleFontSize={36} titleMarginBottom={24}/>
            </div>
            <div className={style.contentInput}>
              <InputItem inputOrTextarea="textarea" inputItemTitle="内容" InputItemPlaceholder="日记条目内容..." inputType="text" titleFontSize={36}  titleMarginBottom={24}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateDiary;