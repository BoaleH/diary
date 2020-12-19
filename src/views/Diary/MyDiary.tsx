import React, { Component } from 'react';
import style from './style/MyDiary.module.scss';
import Header from '../../components/Header/Header';
import { getDiariesListApi } from '../../api/diaryApi';
import { getPersonalInfoApi } from '../../api/CommonApi';
import { formatDate } from '../../utils/common';
import { message } from 'antd';

type StateType = {
  userName: string;
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};
interface MyDiary {
  state: StateType;
  props: PropType;
}

class MyDiary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '游客',
      diariesList: [],
    }
  }

  componentDidMount() {
    this.getDiariesList();
    this.getPersonalInfo();
  }

  // 获取日记列表
  private getDiariesList = async () => {
    const params = {
      count: 100,
      page: 1,
    }

    try {
      const res: any = await getDiariesListApi(params);
      this.setState({
        diariesList: res || [],
      });
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

  // 获取个人数据
  private getPersonalInfo = async () => {
    try {
      const res: any = await getPersonalInfoApi();
      this.setState({
        userName: res.name || '游客',
      });
    } catch (error) {
      const statusCode = error.response.status || null;
      switch (statusCode) {
        case 400:
          message.error('用户id无效', 2);
          break;
        case 401:
          message.error('JWT无效，JWT空位或者JWT过期了', 2);
          break;
        case 401:
          message.error('用户不存在', 2);
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

  // 前往新建日记
  private createDiary = () => {
    this.props.history.push('/CreateDiary');
  }

  // 前往日记详情
  private toDiaryDetail = (id: string) => {
    console.log(222)
    this.props.history.push(`/DiaryDetail?id=${id}`)
  }

  render() {
    const { userName, diariesList } = this.state;

    return (
      <div className={style.page}>
        <Header headerTitle='我的日记' headerLeftBtnText={userName} showLogout needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={`${style.card} ${style.add}`} onClick={this.createDiary}>+</div>
          {
            diariesList && diariesList.length > 0 && diariesList.map((ele: any) => {
              return (
                <div className={`${style.card} ${style.diaryCard}`} key={ele.id} onClick={() => {this.toDiaryDetail(ele.id)}}>
                  <div className={style.diaryDate}>{formatDate(ele.created_at)}</div>
                  <div className={style.diaryTitle}>{ele.title}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default MyDiary;
