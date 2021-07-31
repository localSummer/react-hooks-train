import { Component } from 'react'

let status = 'pending'
let result

export const data = new Promise((resolve) => {
  setTimeout(() => {
    resolve('结果')
  }, 1000)
})

function wrapPromise(promise) {
  let suspender = promise.then(
    (r) => {
      status = 'fulfilled'
      result = r
    },
    (e) => {
      status = 'rejected'
      result = e
    }
  )
  if (status === 'pending') {
    throw suspender
  } else if (status === 'rejected') {
    throw result
  } else if (status === 'fulfilled') {
    return result
  }
}

export class Suspense extends Component {
  state = {
    promise: null,
  }

  componentDidCatch(e) {
    if (e instanceof Promise) {
      this.setState(
        {
          promise: e,
        },
        () => {
          e.then(() => {
            this.setState({
              promise: null,
            })
          })
        }
      )
    }
  }

  render() {
    const { fallback, children } = this.props
    const { promise } = this.state
    if (promise) {
      return fallback
    }
    return children
  }
}

export default wrapPromise
