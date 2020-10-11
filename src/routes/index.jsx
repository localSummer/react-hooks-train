import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Todos = loadable(() => import(/* webpackChunkName: "Todos" */ '../views/Todos'))

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/todo" component={Todos} />
        <Redirect path="*" to="/todo" />
      </Switch>
    </HashRouter>
  )
}

export default Router
