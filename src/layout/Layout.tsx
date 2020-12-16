import React, { Component } from "react";
import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import "./index.scss";
import nav_arrow from "../assets/images/Common/nav_arrow.png";
const tabmenu = [
  {
    imgDefault: require("../assets/images/Tabbar/position.png"),
    imgActive: require("../assets/images/Tabbar/position_active.png"),
    title: '职位广场',
    // link: "http://zp.fuzfu.net",
    link: '/',
    linkType: "internaLink",
  },
  {
    imgDefault: require("../assets/images/Tabbar/integral.png"),
    imgActive: require("../assets/images/Tabbar/integral_active.png"),
    title: '积分活动',
    link: "/Activity",
    linkType: "internaLink",
  },
  {
    imgDefault: require("../assets/images/Tabbar/user.png"),
    imgActive: require("../assets/images/Tabbar/user_active.png"),
    title: '个人中心',
    link: "/PersonalCenter",
    linkType: "internaLink",
  },
];
type MyProps = {
  title?: String;
  showTopBar?: Boolean;
  showBottomBar?: Boolean;
  style?: any;
  goBack?: any;
};
class Layout extends Component<MyProps> {
  render() {
    const { children, title, showTopBar, showBottomBar, style, goBack } = this.props;
    return (
      <div className="layout" style={style}>
        {showTopBar && <TopBar leftSlot={nav_arrow} centerSlot={title} goBack={goBack} />}
        <div className="content">{children}</div>
        {showBottomBar && <TabBar menu={tabmenu} />}
      </div>
    );
  }
}

export default Layout;
