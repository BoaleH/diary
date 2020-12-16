import React from "react";

import { withRouter } from "react-router-dom";
const TabItem = (props: any) => {
  const { data, active, history } = props;
  const { imgDefault, imgActive, linkType, link, title } = data;
  const linkChange = () => {
    if (linkType === "externaLink") {
      window.location.href = link;
    } else {
      history.replace(link);
    }
  };
  return (
    <div className="name" onClick={() => linkChange()}>
      <img src={active ? imgActive : imgDefault} alt="" />
      <p className={active ? 'p-active' : ''}>{title}</p>
    </div>
  );
};
export default withRouter(TabItem);
