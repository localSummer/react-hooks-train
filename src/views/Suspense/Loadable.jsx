import React, { Component } from 'react'

function Loadable(opts) {
  const { loading: LoadingComponent, loader } = opts
  return class LoadableComponent extends Component {
    state = {
      loading: true, // 是否加载中
      loaded: null, // 待加载的模块
    }

    componentDidMount() {
      loader()
        .then((loaded) => {
          this.setState({
            loading: false,
            loaded,
          })
        })
        .catch(() => {})
    }

    render() {
      const { loading, loaded } = this.state
      if (loading) {
        /** LoadingComponent 是一段jsx，不是组件，不能使用 <loadingComponent /> 这种方式 */
        return LoadingComponent
      } else if (loaded) {
        const LoadedComponent = loaded.__esModule ? loaded.default : loaded
        return <LoadedComponent {...this.props} />
      } else {
        return null
      }
    }
  }
}

export default Loadable
