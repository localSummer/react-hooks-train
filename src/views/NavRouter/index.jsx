import React from 'react'
import { useHistory, useListen, useLocation, Router, Switch, Route, withRouter } from '../MiniRouter'

const HomeOne = withRouter((props) => {
  const routerGo = () => {
    const { history } = props
    history.push('/navRouter/detail')
  }
  return (
    <div>
      <p>测试HOC——withRouter</p>
      <button onClick={routerGo}>跳转到详情页</button>
    </div>
  )
})

const Home = () => {
  return (
    <div>
      Home Page hello,world。 let us learn React!
      <HomeOne />
    </div>
  )
}

const List = () => {
  return <div>List Page</div>
}

const Detail = () => {
  return <div>Detail Page</div>
}

const menuList = [
  {
    name: '首页',
    path: '/navRouter/home',
  },
  {
    name: '列表',
    path: '/navRouter/list',
  },
  {
    name: '详情',
    path: '/navRouter/detail',
  },
]

const Nav = () => {
  const history = useHistory()
  const location = useLocation()
  const routerGo = (url) => history.push(url)
  const path = location.pathname
  return (
    <div>
      {menuList.map((item) => (
        <span
          className={`nav ${item.path === path ? 'active' : ''}`}
          key={item.path}
          onClick={() => routerGo(item.path)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

const Top = () => {
  useListen((location) => {
    console.log('当前路由是：', location.pathname)
  })
  return <div>Top Component</div>
}

const Index = () => {
  console.log('根组件渲染')
  return (
    <Router>
      <Top />
      <Nav />
      <Switch>
        <Route path="/navRouter/home" component={Home} />
        <Route path="/navRouter/list" component={List} />
        <Route path="/navRouter/detail" component={Detail} />
      </Switch>
      <div>Buttom Component</div>
    </Router>
  )
}

export default Index
