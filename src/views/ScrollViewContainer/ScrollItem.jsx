import React from 'react'

const ScrollItem = ({ item }) => {
  return (
    <div className="goods_item">
      <img src={item.giftImage} className="item_image" alt="" />
      <div className="item_content">
        <div className="goods_name">{item.giftName}</div>
        <div className="hold_price" />
        <div className="new_price">
          <div className="new_price">
            <div className="one view">¥ {item.price}</div>
          </div>
        </div>
        <img className="go_share  go_text" alt="" />
      </div>
    </div>
  )
}

export default ScrollItem
