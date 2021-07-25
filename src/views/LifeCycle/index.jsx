import React, { Component } from 'react'

/**
 * 1. 组件执行初始化阶段还是更新阶段的判断标准是 current 树是否存在，current === null ？初始化阶段（componentDidMount） ： 更新阶段（componentDidMount(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate = instance.getSnapshotBeforeUpdate(prevProps, prevState))）
 * 从上面可以直观看到 componentDidMount 执行时机 和 componentDidUpdate 执行时机是相同的，只不过一个是针对初始化，一个是针对组件再更新
 * 2. 当存在 static getDerivedStateFromProps 或者 getSnapshotBeforeUpdate 时，componentWillMount 不会被调用
 * 3. 更新阶段getDerivedStateFromProps 存在时，componentWillReceiveProps 不会被调用
 * 4. getSnapshotBeforeUpdate 执行是在Commit 阶段，commit 阶段细分为 before Mutation( DOM 修改前)，Mutation ( DOM 修改)，Layout( DOM 修改后) 三个阶段
 * getSnapshotBeforeUpdate 发生在before Mutation 阶段，生命周期的返回值，将作为第三个参数 __reactInternalSnapshotBeforeUpdate 传递给 componentDidUpdate
 * 5. getDerivedStateFromProps 属于静态方法，不能访问this，它是为了取代 componentWillMount 和 componentWillReceiveProps，返回值作为 shouldComponentUpdate 的第二个参数 newState
 * 6. useEffect 的执行是异步的，等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行，所以其不会阻塞浏览器绘制视图
 * 7. useLayoutEffect 同步执行，是在DOM绘制之前执行，这样浏览器只会绘制一次，其会阻塞浏览器绘制视图，在时机上 ，componentDidMount / componentDidUpdate 和 useLayoutEffect 更类似
 * 8. 如何选择 useEffect 和 useLayoutEffect ：修改 DOM ，改变布局就用 useLayoutEffect ，其他情况就用 useEffect
 */
class LifeCycle extends Component {
  state = {
    count: 0,
  }

  /** 初始化阶段和组件更新都会执行 */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps nextProps, prevState: ', nextProps, prevState)
    return {
      count: ++prevState.count,
    }
  }

  /* getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
  } */

  /** 当存在 static getDerivedStateFromProps 或者 getSnapshotBeforeUpdate 时，componentWillMount 不会被调用 */
  /* componentWillMount() {
    console.log('componentWillMount')
  } */

  handleChange = (params) => {
    this.setState((prevState) => ({
      count: ++prevState.count,
    }))
  }

  render() {
    return (
      <div>
        LifeCycle{this.state.count}
        <button onClick={this.handleChange}>add</button>
      </div>
    )
  }
}

export default LifeCycle
