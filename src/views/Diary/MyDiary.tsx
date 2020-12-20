import React, { Component, createRef } from 'react';
import style from './style/MyDiary.module.scss';
import Header from '../../components/Header/Header';
import { getDiariesListApi } from '../../api/diaryApi';
import { getPersonalInfoApi } from '../../api/CommonApi';
import { formatDate } from '../../utils/common';
import { message } from 'antd';

type StateType = {
  userName: string;
  count: number;
  page: number;
  nomore: boolean;
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};
interface MyDiary {
  state: StateType;
  props: PropType;
  pageContentRef: any;
  scrollBoxRef: any;
}

class MyDiary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '游客', // 用户名
      count: 18, // 每页条数
      page: 1, // 当前页码
      nomore: false, // 是否没有更多日记
      diariesList: [], // 日记列表
    };
    this.pageContentRef = createRef();
    this.scrollBoxRef = createRef();
  }

  componentDidMount() {
    this.getDiariesList();
    this.getPersonalInfo();
  }

  private bindHandleScroll = (e: any) => {
    const scrollTop = this.pageContentRef.current.scrollTop; // 滚动距离
    const scrollHeight = this.pageContentRef.current.scrollHeight; // 内容可视区域的高度加上溢出（滚动）的距离
    const clientHeight = this.pageContentRef.current.clientHeight; // 内容可视区域的高度
    if (scrollTop + clientHeight === scrollHeight) {
      this.getDiariesList();
    }
  }

  // 获取日记列表
  private getDiariesList = async () => {
    const { count, page, nomore, diariesList } = this.state;
    const params = {
      count,
      page,
    }

    if (!nomore) {
      try {
        const res: any = await getDiariesListApi(params);
        if (!res || !(res.length > 0)) {
          this.setState({
            nomore: true,
          });
        } else {
          this.setState({
            diariesList: diariesList.concat(res),
            page: page + 1,
          })
        }
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
        case 404:
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
    this.props.history.push(`/DiaryDetail?id=${id}`)
  }

  render() {
    const { userName, diariesList } = this.state;

    return (
      <div className={style.page}>
        <Header headerTitle='我的日记' headerLeftBtnText={userName} showLogout needRightBtnBoxshadow/>
        <div className={`${style.pageContent}`} ref={this.pageContentRef} onScroll={this.bindHandleScroll}>
          <div className={style.scrollBox} ref={this.scrollBoxRef}>
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
      </div>
    )
  }
}

export default MyDiary;
