import React from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";

// 获取路由信息
function TopBar(props: any) {
  const { leftSlot, centerSlot, rightSlot, history, rightEvent, goBack } = props;
  return (
    <div className="topBar">
      <div className="bar-left" onClick={goBack ? goBack : history.goBack}>
        <img src={leftSlot} alt="" />
      </div>
      <div className="bar-center">{centerSlot}</div>
      <div className="bar-right" onClick={rightEvent ? rightEvent : null}>{rightSlot}</div>
    </div>
  );
}

export default withRouter(TopBar)