import React, { Component } from 'react';
import './style/Introduction.scss';
import introduction01 from '../../assets/images/Introduction/introduction01.png';
import introduction02 from '../../assets/images/Introduction/introduction02.png';
import introduction03 from '../../assets/images/Introduction/introduction03.png';


class Introduction extends Component {
  render() {
    return (
      <div className="introduction">
        <img src={introduction01} alt=""/>
        <img src={introduction02} alt=""/>
        <img src={introduction03} alt=""/>
      </div>
    )
  }
}

export default Introduction
