import React, { Component } from 'react';
import style from './style/CreateDiary.module.scss';
import Header from '../../components/Header/Header';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button/Button';
import { createDiaryApi } from '../../api/diaryApi';

type StateType = {
  title: string;
  content: string;
  errorPrompt: string;
  btnDisable: boolean;
};
type PropType = {
  [propName: string]: any;
};
interface CreateDiary {
  state: StateType;
  props: PropType;
}
class CreateDiary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '', // 邮件地址
      content: '', // 密码
      errorPrompt: '', // 错误提示
      btnDisable: false, // 按钮禁用
    }
  }

  // 输入标题
  private inputTitle = (e: any) => {
    this.setState({
      title: e.target.value,
    });
  }

  // 输入内容
  private inputContent = (e: any) => {
    this.setState({
      content: e.target.value,
    });
  }

  // 提交
  private submit = async () => {
    const { title, content } = this.state;
    if (!title) {
      this.setState({
        errorPrompt: '请输入标题',
      });
      return;
    }
    if (!content) {
      this.setState({
        errorPrompt: '请输入内容',
      });
      return;
    }
    const params = {
      title,
      content,
    }
    this.setState({
      btnDisable: true,
    });
    try {
      await createDiaryApi(params);
      this.props.history.push('/MyDiary');
    } catch (error) {
      console.log(error)
      const statusCode = error.response.status || null;
      switch (statusCode) {
        case 400:
          this.setState({
            btnDisable: false,
            errorPrompt: '请求body的内容无效',
          });
          break;
        case 401:
          this.setState({
            btnDisable: false,
            errorPrompt: 'JWT无效，JWT空位或者JWT过期了',
          });
          break;
        case 500:
          this.setState({
            btnDisable: false,
            errorPrompt: '内部服务器错误',
          });
          break;
        default:
          this.setState({
            btnDisable: false,
            errorPrompt: '内部服务器错误',
          });
          break;
      }
    }
  }

  render() {
    const { errorPrompt, btnDisable } = this.state;
    return (
      <div className={style.page}>
        <Header headerTitle='新日记条目' showGoBackToMyDiary showLogout needLeftBtnBoxshadow needRightBtnBoxshadow/>
        <div className={style.pageContent}>
          <div className={style.paper} style={errorPrompt ? {paddingTop: '0px'} : {}}>
            {errorPrompt && <div className={style.error}>
              {errorPrompt}
            </div>}
            <div className={style.titleInput}>
              <InputItem inputItemTitle="标题" InputItemPlaceholder="日记条目标题..." inputType="text" titleFontSize={36} titleMarginBottom={24} inputCallback={this.inputTitle}/>
            </div>
            <div className={style.contentInput}>
              <InputItem inputOrTextarea="textarea" inputItemTitle="内容" InputItemPlaceholder="日记条目内容..." inputType="text" titleFontSize={36}  titleMarginBottom={24} inputCallback={this.inputContent}/>
            </div>
            <div className={style.btn}>
              <Button bottonText="提交" btnWidth={165} btnHeigth={50} btnClickCallBack={this.submit} disabled={btnDisable} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateDiary;