import React, { Component } from "react";
import { citys } from "../../utils/citys";
import "./style/IndexScroll.scss";
export default class IndexScroll extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFixed: 0,
      index: 1,
      initialHeight: 0,
      endHerght: 0,
      letterArr: [],
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.createLetter();
  }
  createLetter = () => {
    let _arr = [];
    for (var i = 0; i < 26; i++) {
      _arr.push(String.fromCharCode(65 + i));
    }
    _arr = _arr.filter((item: any) => item !== "I" && item !== "O" && item !== "U" && item !== "V");
    this.setState({
      letterArr: _arr,
    });
  };
  handleScroll = () => {
    let i = this.state.index === 0 ? 1 : this.state.index;
    const scrollTop: any = document.getElementById("main")?.scrollTop;
    const sections: any = document.getElementsByClassName("section");
    if (scrollTop > this.state.initialHeight) {
      for (i; i < sections.length; i++) {
        if (sections[i - 1].offsetTop < scrollTop < sections[i].offsetTop) {
          console.log(sections[i].offsetTop + "高度" + sections[i - 1].offsetTop);
          this.setState({
            isFixed: i,
            index: i + 1,
            initialHeight: sections[i].offsetTop,
            endHerght: sections[i - 1].offsetTop,
          });
          break;
        }
      }
    }
    if (scrollTop <= this.state.endHerght) {
      if (i >= sections.length) {
        i = sections.length - 1;
      }
      for (let j = i; j > 0; j--) {
        if (sections[j - 1].offsetTop < scrollTop < sections[j].offsetTop) {
          console.log(sections[i - 1].offsetTop + "高度" + sections[i].offsetTop);
          this.setState({
            isFixed: j,
            index: j - 1,
            initialHeight: sections[j].offsetTop,
            endHerght: sections[j - 1].offsetTop,
          });
          console.log(j);
          break;
        }
      }
    }
  };
  scrollToAnchor = (anchorName: any) => {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        this.setState({
          isFixed: null,
        });
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  render() {
    const { letterArr } = this.state;
    return (
      <div className="contentBox" id="main">
        <ul className="indexBox">
          {letterArr.map((item: any, index: any) => (
            <li key={item} onClick={() => this.scrollToAnchor(item)}>
              {item}
            </li>
          ))}
        </ul>
        {/* <iframe title="123" src="https://h5.weishi.qq.com/weishi/feed/763qVdjwZ1KwXUa9j/wsfeed?wxplay=1&id=763qVdjwZ1KwXUa9j&collectionid=ai-5f99b7c4a349f5423827f809&themeid=ai-5f96f0f3a349f561283aef3b&spid=8047246346496585728&qua=v1_and_weishi_8.3.6_588_312026001_d&chid=100081003&pkg=&attach=cp_reserves3_1000370721"></iframe>
        <video controls>
          <source src="http://v95-dy.ixigua.com/53e40831f3d7f202352d358028f2569a/5fabb448/video/tos/cn/tos-cn-ve-15/765872dfd43c494f9ede6afafadeec28/?a=1128&amp;br=1332&amp;bt=444&amp;cr=0&amp;cs=0&amp;cv=1&amp;dr=0&amp;ds=3&amp;er=&amp;l=2020111116514901019802309015008153&amp;lr=&amp;mime_type=video_mp4&amp;qs=0&amp;rc=amg2cDNobDdueDMzaWkzM0ApNTc0NTw0PGQ5NzxnZTk3Z2dhZDM0Lm1raGlfLS1hLTBzczQzMy8uLzMzMF5hMV82L2A6Yw%3D%3D&amp;vl=&amp;vr=" type="video/mp4" />
        </video> */}
        {citys.map((item: any, index: any) => {
          return (
            <div key={"citys" + index} id={item.code} className="section">
              <p>{item.code}</p>
              <div>
                {item.cityList.map((itemCity: String, indexCity: Number) => (
                  <p key={"city" + indexCity}>{itemCity}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
