import React, { createRef } from 'react'
import { Fragment } from 'react'
import { Component } from 'react'

const getColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r},${g},${b},0.8)`
}

const getPosition = (position) => {
  const { width, height } = position
  return {
    left: `${Math.ceil(Math.random() * width)}px`,
    top: `${Math.ceil(Math.random() * height)}px`,
  }
}

const Circle = ({ position }) => {
  const style = React.useMemo(() => {
    return {
      background: getColor(),
      ...getPosition(position),
    }
  }, [position])
  return <div style={style} className="circle" />
}

class TimeSlicing extends Component {
  state = {
    dataList: [], // 数据源列表
    renderList: [], // 渲染列表
    position: {
      width: 0,
      height: 0,
    },
    eachRenderNum: 500,
  }

  box = createRef()

  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.box.current

    const originList = new Array(20000).fill(1)

    const times = Math.ceil(originList.length / this.state.eachRenderNum)

    let index = 1

    this.setState(
      {
        position: {
          width: offsetWidth,
          height: offsetHeight,
        },
        dataList: originList,
      },
      () => {
        this.toRenderList(index, times)
      }
    )
  }

  toRenderList = (index, times) => {
    if (index > times) return
    const { renderList } = this.state
    renderList.push(this.renderNewList(index))
    this.setState({
      renderList,
    })
    /** 通过 requestIdleCallback 代替 setTimeout 浏览器空闲执行下一帧渲染 */
    requestIdleCallback(() => {
      this.toRenderList(++index, times)
    })
  }

  renderNewList = (index) => {
    const { dataList, eachRenderNum, position } = this.state
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum)
    return (
      <Fragment key={index}>
        {list.map((_, index) => (
          <Circle key={index} position={position} />
        ))}
      </Fragment>
    )
  }

  render() {
    return (
      <div className="big-data-container" ref={this.box}>
        {this.state.renderList}
      </div>
    )
  }
}

export default TimeSlicing
