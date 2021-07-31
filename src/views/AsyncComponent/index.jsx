import React from 'react'
import { Component } from 'react'

/**
 *
 * @param {*} Component  需要异步数据的component
 * @param {*} api        请求数据接口,返回Promise，可以再then中获取与后端交互的数据
 */
const AsyncComponent = (Component, api) => {
  const AsyncComponentPromise = () =>
    new Promise(async (resolve, reject) => {
      let data = await api()
      resolve({
        default: (props) => <Component rData={data} {...props} />,
      })
    })

  return React.lazy(AsyncComponentPromise)
}

const getData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'wxw',
        say: 'async component',
      })
    }, 1000)
  })

/** 测试异步组件 */
const Test = ({ rData, age }) => {
  const { name, say } = rData
  return (
    <div>
      <div> hello , my name is {name} </div>
      <div>age : {age} </div>
      <div> i want to say {say} </div>
    </div>
  )
}

class App extends Component {
  LazyTest = AsyncComponent(Test, getData)

  render() {
    const { LazyTest } = this
    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <LazyTest age={18} />
      </React.Suspense>
    )
  }
}

export default App
