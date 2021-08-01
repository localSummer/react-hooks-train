import React, { useEffect, useRef, useState } from 'react'
import './index.css'

const VirtualList = () => {
  const [dataList, setDataList] = useState([])
  const [position, setPosition] = useState([0, 0])
  const scroll = useRef(null)
  const box = useRef(null)
  const context = useRef(null)
  const scrollInfo = useRef({
    height: 500,
    bufferCount: 8,
    itemHeight: 60,
    renderCount: 0,
  })

  useEffect(() => {
    const height = box.current.offsetHeight
    const { itemHeight, bufferCount } = scrollInfo.current
    const renderCount = Math.ceil(height / itemHeight) + bufferCount
    scrollInfo.current = {
      height,
      itemHeight,
      bufferCount,
      renderCount,
    }
    const dataList = new Array(10000).fill(1).map((_, index) => index + 1)
    setDataList(dataList)
    setPosition([0, renderCount])
  }, [])

  const handleScroll = () => {
    const { scrollTop } = scroll.current
    const { itemHeight, renderCount } = scrollInfo.current
    const currentOffset = scrollTop - (scrollTop % itemHeight)
    console.log('currentOffset: ', currentOffset)
    const start = Math.floor(scrollTop / itemHeight)
    /** 偏移，产生下滑效果 */
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1)
    /** 发生了滑动 */
    if (end !== position[1] || start !== position[0]) {
      setPosition([start, end])
    }
  }

  const { height, itemHeight } = scrollInfo.current

  const [start, end] = position

  /** 获取渲染区间 */
  const renderList = dataList.slice(start, end)

  console.log('position', position)

  return (
    <div className="list-box" ref={box}>
      <div className="scroll-box" ref={scroll} style={{ height: `${height}px` }} onScroll={handleScroll}>
        <div className="scroll-hold" style={{ height: `${dataList.length * itemHeight}px` }}></div>
        <div className="context" ref={context}>
          {renderList.map((item, index) => (
            <div className="list-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
