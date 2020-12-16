import React, { Component, createRef } from 'react';
import './ImgView.scss';

type StateType = {
  style: any
  [propName: string]: any;
};
type PropType = {
  imgUrl: string;
  hideImgView: any;
  [propName: string]: any;
};
interface ImgView {
  state: StateType;
  props: PropType;
  imgViewRef: any;
}

class ImgView extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      style: {},
    };
    this.imgViewRef = createRef();
  }

  componentDidMount() {
    this.judgeImgHeight();
  }

  private judgeImgHeight = () => {
    const img: any = new Image();
    img.src = this.props.imgUrl;
    if ((img.height * (this.imgViewRef.current.offsetWidth/img.width)) < this.imgViewRef.current.offsetHeight) {
      this.setState({
        style: {display: 'flex', justifyContent: 'center', alignItems: 'center'}
      })
    } else {
      return false;
    }
  }

  render() {
    const { imgUrl } = this.props;
    const { style } = this.state;

    return (
      <div className="img-view" onClick={this.props.hideImgView} ref={this.imgViewRef} style={style}>
        <div className="img-view-box">
          <img src={imgUrl} alt="" className="img-view-img" />
        </div>
      </div>
    )
  }
}

export default ImgView;
