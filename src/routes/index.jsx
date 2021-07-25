import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Todos = loadable(() => import(/* webpackChunkName: "Todos" */ '../views/Todos'))
const Hooks = loadable(() => import(/* webpackChunkName: "Hooks" */ '../views/Hooks'))
const Props = loadable(() => import(/* webpackChunkName: "Props" */ '../views/Props'))
const Form = loadable(() => import(/* webpackChunkName: "Form" */ '../views/Form'))
const FormContext = loadable(() => import(/* webpackChunkName: "FormContext" */ '../views/FormContext'))
const LifeCycle = loadable(() => import(/* webpackChunkName: "LifeCycle" */ '../views/LifeCycle'))
const ScrollViewContainer = loadable(() =>
  import(/* webpackChunkName: "ScrollViewContainer" */ '../views/ScrollViewContainer')
)

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/todo" component={Todos} />
        <Route exact path="/hooks" component={Hooks} />
        <Route exact path="/props" component={Props} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/formContext" component={FormContext} />
        <Route exact path="/lifeCycle" component={LifeCycle} />
        <Route exact path="/scrollview" component={ScrollViewContainer} />
        <Redirect path="*" to="/scrollview" />
      </Switch>
    </HashRouter>
  )
}

export default Router
