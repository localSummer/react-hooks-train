import React, { Component } from 'react'

class Form extends Component {
  static displayName = 'form'

  state = {
    formData: {},
  }

  submitForm = (callback) => {
    callback({ ...this.state.formData })
  }

  resetForm = () => {
    const { formData } = this.state
    Object.keys(formData).forEach((item) => {
      formData[item] = ''
    })
    this.setState({
      formData,
    })
  }

  setValue = (name, value) => {
    console.log(name, value)
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    })
  }

  render() {
    const { children } = this.props
    const renderChildren = []
    React.Children.forEach(children, (child) => {
      if (child.type.displayName === 'formItem') {
        const { name } = child.props
        const Children = React.cloneElement(
          child,
          {
            key: name,
            value: this.state.formData[name] || '',
            handleChange: this.setValue,
          },
          child.props.children
        )
        renderChildren.push(Children)
      }
    })
    return renderChildren
  }
}

export default Form
