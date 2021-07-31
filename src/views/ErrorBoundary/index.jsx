import React, { Component } from 'react'

/**
 * componentDidCatch 作用：
 * 1. 可以调用 setState 促使组件渲染，并做一些错误拦截功能，React 更期望 我们使用 getDerivedStateFromError
 * 2. 监控组件，发生错误，上报错误日志
 * getDerivedStateFromError 作用：
 * 1. 捕获错误进行UI降级
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  /**
   * commit 阶段被调用，内部可以调用 setState 方法
   * @param  {...any} args 抛出的错误 和 组件引发错误的栈信息
   */
  componentDidCatch(...args) {
    console.log('args: ', args)
    // 降级UI
    this.setState({
      hasError: true,
    })
  }

  render() {
    const { hasError } = this.state

    return <div>{hasError ? <div>组件出现错误</div> : <div>组件正常展示</div>}</div>
  }
}

export default ErrorBoundary
