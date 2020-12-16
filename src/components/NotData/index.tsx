import React from 'react'
import './index.scss'
import not_data from '../../assets/images/Common/not_data.png'
export default function Notdata() {
  return (
    <div className="notData">
      <img src={not_data} alt="" />
      <p>暂无数据</p>
    </div>
  )
}
