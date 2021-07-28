import React from 'react'
import withRouter from './withRouter'

const Text = () => {
  return <div>Text</div>
}

const WrappedText = withRouter(Text)

const Hoc = () => {
  return (
    <div>
      <WrappedText />
    </div>
  )
}

export default Hoc
