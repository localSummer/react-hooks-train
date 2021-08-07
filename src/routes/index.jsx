import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Todos = loadable(() => import(/* webpackChunkName: "Todos" */ '../views/Todos'))
const Hooks = loadable(() => import(/* webpackChunkName: "Hooks" */ '../views/Hooks'))
const Props = loadable(() => import(/* webpackChunkName: "Props" */ '../views/Props'))
const Form = loadable(() => import(/* webpackChunkName: "Form" */ '../views/Form'))
const FormContext = loadable(() => import(/* webpackChunkName: "FormContext" */ '../views/FormContext'))
const LifeCycle = loadable(() => import(/* webpackChunkName: "LifeCycle" */ '../views/LifeCycle'))
// const ScrollViewContainer = loadable(() =>
//   import(/* webpackChunkName: "ScrollViewContainer" */ '../views/ScrollViewContainer')
// )
const RefComponent = loadable(() => import(/* webpackChunkName: "refComponent" */ '../views/RefComponent'))
const Hoc = loadable(() => import(/* webpackChunkName: "HOC" */ '../views/Hoc'))
const Suspense = loadable(() => import(/* webpackChunkName: "Suspense" */ '../views/Suspense'))
const ErrorBoundary = loadable(() => import(/* webpackChunkName: "ErrorBoundary" */ '../views/ErrorBoundary'))
const AsyncComponent = loadable(() => import(/* webpackChunkName: "AsyncComponent" */ '../views/AsyncComponent'))
const TimeSlicing = loadable(() => import(/* webpackChunkName: "TimeSlicing" */ '../views/TimeSlicing'))
const VirtualList = loadable(() => import(/* webpackChunkName: "VirtualList" */ '../views/VirtualList'))
const NavRouter = loadable(() => import(/* webpackChunkName: "NavRouter" */ '../views/NavRouter'))

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
        {/* <Route exact path="/scrollview" component={ScrollViewContainer} /> */}
        <Route exact path="/ref" component={RefComponent} />
        <Route exact path="/hoc" component={Hoc} />
        <Route exact path="/suspense" component={Suspense} />
        <Route exact path="/errorBoundary" component={ErrorBoundary} />
        <Route exact path="/asyncComponent" component={AsyncComponent} />
        <Route exact path="/timeSlicing" component={TimeSlicing} />
        <Route exact path="/virtualList" component={VirtualList} />
        <Route path="/navRouter" component={NavRouter} />
        <Redirect path="*" to="/navRouter" />
      </Switch>
    </HashRouter>
  )
}

export default Router
