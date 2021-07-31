import React from 'react'
import { Component } from 'react'
// import Loadable from './Loadable'
import wrapPromise, { data } from './wrapPromise'

const Loading = <div>loading...</div>

/* const LoadableText = Loadable({
  loading: Loading,
  loader: () => import('./Text'),
}) */

const App = () => {
  const state = wrapPromise(data)

  return <div>{state}</div>
}

const LoadableText = React.lazy(() => import('./Text'))

class Suspense extends Component {
  render() {
    return (
      <React.Suspense fallback={Loading}>
        <LoadableText />
        <App />
      </React.Suspense>
    )
  }
}

export default Suspense
