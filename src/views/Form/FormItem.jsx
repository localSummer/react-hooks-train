import React from 'react'

const FormItem = (props) => {
  const { children, name, label, value, handleChange } = props

  const onChange = (value) => {
    handleChange(name, value)
  }

  return (
    <div className="form-item">
      <span className="label">{label}:</span>
      {React.isValidElement(children) && children.type.displayName === 'input'
        ? React.cloneElement(children, { onChange, value })
        : null}
    </div>
  )
}

FormItem.displayName = 'formItem'

export default FormItem
