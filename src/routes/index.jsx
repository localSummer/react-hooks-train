import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Todos = loadable(() => import(/* webpackChunkName: "Todos" */ '../views/Todos'))
const Hooks = loadable(() => import(/* webpackChunkName: "Hooks" */ '../views/Hooks'))

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/todo" component={Todos} />
        <Route exact path="/hooks" component={Hooks} />
        <Redirect path="*" to="/hooks" />
      </Switch>
    </HashRouter>
  )
}

export default Router
