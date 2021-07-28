import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import hoistStatics from 'hoist-non-react-statics'

/**
 * 高级组件强化 Props
 * @param {*} Component
 */
function withRouter(Component) {
  const displayName = `withRouter(${Component.displayName || Component.name})`

  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props
    const history = useHistory()
    const location = useLocation()

    return <Component {...remainingProps} history={history} location={location} ref={wrappedComponentRef} />
  }

  C.displayName = displayName
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}

export default withRouter
