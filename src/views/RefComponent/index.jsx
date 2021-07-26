import React, { Component, createRef } from 'react'

/**
 * 1. 不要在函数组件中使用 createRef，否则会造成 Ref 对象内容丢失等情况
 */
class RefComponent extends Component {
  constructor(props) {
    super(props)
    this.currentDom = createRef(null)
  }

  componentDidMount() {
    console.log('componentDidMount: ', this.currentDom)
  }

  render() {
    return <div ref={this.currentDom}>ref对象模式获取元素或组件</div>
  }
}

export default RefComponent
