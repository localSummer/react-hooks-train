import React, { createContext, forwardRef, useImperativeHandle, useState } from 'react'

export const FormContext = createContext({})

const Form = forwardRef((props, formRef) => {
  const [formData, setFormData] = useState({})

  useImperativeHandle(formRef, () => ({
    submitForm: (callback) => {
      callback && callback({ ...formData })
    },
    resetForm: () => {
      let data = { ...formData }
      Object.keys(data).forEach((item) => {
        data[item] = ''
      })
      setFormData(data)
    },
  }))

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const renderContent = () => {
    const renderChildren = []
    React.Children.map(props.children, (child) => {
      if (child.type.displayName === 'formItem') {
        renderChildren.push(child)
      }
    })
    return renderChildren
  }

  return <FormContext.Provider value={{ formData, handleChange }}>{renderContent()}</FormContext.Provider>
})

Form.displayName = 'form'

export default Form
