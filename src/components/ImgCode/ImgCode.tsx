import React, { Component } from 'react';
import './ImgCode.scss';

const defaultProps = {
  identifyCode: '',
  fontSizeMin: 20/375*document.documentElement.clientWidth,
  fontSizeMax: 40/375*document.documentElement.clientWidth,
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  colorMin: 50,
  colorMax: 160,
  lineColorMin: 40,
  lineColorMax: 180,
  dotColorMin: 0,
  dotColorMax: 255,
  contentWidth: 112/375*document.documentElement.clientWidth,
  contentHeight: 38/375*document.documentElement.clientWidth,
  refresh: () => {},
};

type StateType = {
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};
interface ImgCode {
  state: StateType;
  props: PropType;
}

class ImgCode extends Component {
  // 设置默认props
  static defaultProps = defaultProps;
  constructor(props: any) {
    super(props);
    this.state = {
      firstFile: null,
    };
  }

  componentDidMount() {
    this.drawPic();
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextProps.identifyCode !== this.props.identifyCode;
  }

  componentDidUpdate() {
    this.drawPic();
  }

  // 生成一个随机数
  private randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // 生成一个随机的颜色
  private randomColor = (min: number, max: number) => {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  private drawPic = () => {
    let canvas: any = document.getElementById('s-canvas');
    let ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';
    // 绘制背景
    // 随机背景色
    // ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
    // 白色背景色
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, this.props.contentWidth, this.props.contentHeight);
    // const clientWidth = document.documentElement.clientWidth; 
    // const canvasContentWidth = this.props.contentWidth / 375 * clientWidth;
    // const canvasContentHeight = this.props.contentHeight / 375 * clientWidth;
    // console.log(canvasContentWidth, canvasContentHeight)
    // ctx.fillRect(0, 0, canvasContentWidth, canvasContentHeight);
    // 绘制文字
    for (let i = 0; i < this.props.identifyCode.length; i++) {
      this.drawText(ctx, this.props.identifyCode[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  }

  private drawText = (ctx: any, txt: any, i: any) => {
    ctx.fillStyle = this.randomColor(this.props.colorMin, this.props.colorMax);
    ctx.font = this.randomNum(this.props.fontSizeMin, this.props.fontSizeMax) + 'px SimHei';
    // ctx.font = (this.randomNum(this.props.fontSizeMin, this.props.fontSizeMax)) / 375 * 100 + 'vw SimHei';
    let x = (i + 1) * (this.props.contentWidth / (this.props.identifyCode.length + 1));
    let y = this.randomNum(this.props.fontSizeMax, this.props.contentHeight - 5);
    var deg = this.randomNum(-45, 45);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 180);
    ctx.translate(-x, -y);
  }

  private drawLine = (ctx: any) => {
    // 绘制干扰线
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = this.randomColor(this.props.lineColorMin, this.props.lineColorMax);
      ctx.beginPath();
      ctx.moveTo(this.randomNum(0, this.props.contentWidth), this.randomNum(0, this.props.contentHeight));
      ctx.lineTo(this.randomNum(0, this.props.contentWidth), this.randomNum(0, this.props.contentHeight));
      ctx.stroke();
    }
  }
  private drawDot = (ctx: any) => {
    // 绘制干扰点
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(this.randomNum(0, this.props.contentWidth), this.randomNum(0, this.props.contentHeight), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }



  render() {
    return (
      <div className="s-canvas" onClick={this.props.refresh}>
        <canvas id="s-canvas" width={this.props.contentWidth} height={this.props.contentHeight}></canvas>
        {/* <canvas id="s-canvas" width={this.props.contentWidth/375*document.documentElement.clientWidth} height={this.props.contentHeight/375*document.documentElement.clientWidth}></canvas> */}
      </div>
    )
  }
}

export default ImgCode;
