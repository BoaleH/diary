import React from "react";
import TabItem from "./TabItem";
import "./index.scss";
export default function TabBar(props: any) {
  const { menu = [] } = props;
  const currentPath: any = window.location.pathname;

  return (
    <div className="tabBar">
      {menu.map((item: any, index: any) => {
        return <TabItem key={"tabItem" + index} data={item} active={currentPath === item.link}></TabItem>;
      })}
    </div>
  );
}
