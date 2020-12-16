import React, { Component } from 'react';
import { createPortal } from "react-dom";
import { withRouter } from "react-router-dom";
import './PopupModal.scss';
import icon_close from '../../assets/images/icon_close.png'
class PopupPortals extends Component<any, any> {
  closeModal = () => {
    this.props.closeModal(false);
  }
  render() {
    const { title, content, btnText } = this.props.PopupConetn
    return createPortal(
      <div className="PopupModal">
        <div className="modalContent">
          <div className="modalContent-top">
            <p className="modalContent-top-title">{title}</p>
            {content && <p className="modalContent-top-content">{content}</p>}
            <button className="modalContent-top-btn" onClick={this.props.handleBtnClick}>{btnText}</button>
          </div>
          <img src={icon_close} alt="" onClick={this.closeModal} />
        </div>
      </div>,
      document.body,
    );
  }
}
export default withRouter(PopupPortals)