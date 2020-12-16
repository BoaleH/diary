import React, { Component } from 'react';
import './style/Feedback.scss';
import Layout from '../../layout/Layout';
import { feedbackApi } from '../../api/PersonalCenter';
import { Toast } from 'antd-mobile';
import { pageScroll } from '../../utils/pageScroll';
import TopBar from '../../components/TopBar';
import nav_arrow from "../../assets/images/Common/nav_arrow.png";

type StateType = {
  whichFeedback: string;
  canSubmit: boolean;
};
type PropType = {
  [propName: string]: any;
};
interface Feedback {
  state: StateType;
  props: PropType;
}

class Feedback extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      whichFeedback: '',
      canSubmit: false,
    }
  }

  componentDidMount() {
    pageScroll();
  }

  // 反馈输入
  private inputFeedback = (e: any) => {
    if (e.target.value) {
      this.setState({
        whichFeedback: e.target.value,
        canSubmit: true,
      });
    } else {
      this.setState({
        whichFeedback: e.target.value,
        canSubmit: false,
      });
    }
  }
  // 提交
  private fetchSubmit = async () => {
    if (!this.state.canSubmit) {
      Toast.info('请输入反馈意见', 2)
      return;
    }
    const employeeUserNo = localStorage.getItem('employeeUserNo');
    const params = {
      optionDetail: this.state.whichFeedback
    }
    await feedbackApi(params, employeeUserNo);
    Toast.success('提交成功', 2, () => {
      this.props.history.go(-1);
    });
  }

  render() {
    // const { canSubmit } = this.state;
    return (
      <Layout title="意见反馈" >
        <TopBar centerSlot="意见反馈" leftSlot={nav_arrow} rightSlot='保存' rightEvent={this.fetchSubmit} />
        <div className="feedback">
          <div className="feedback-title">
            问题和意见
          </div>
          <div className="text-input">
            <textarea placeholder="请简要描述您的问题和建议，以便我们为您提供更好的帮助" onChange={this.inputFeedback}></textarea>
          </div>
          {/* <div className="submit-btn" onClick={canSubmit ? this.fetchSubmit : () => {}}>
            <span>提交</span>
            {!canSubmit && <div className="unavailable"></div>}
          </div> */}
        </div>
      </Layout>
    )
  }
}

export default Feedback;