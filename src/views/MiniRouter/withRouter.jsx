import React, { useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { RouterContext } from './Router'

const withRouter = (Component) => {
  const WrappedComponent = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props
    const context = useContext(RouterContext)
    return <Component {...remainingProps} ref={wrappedComponentRef} {...context} />
  }

  return hoistStatics(WrappedComponent, Component)
}

export default withRouter
