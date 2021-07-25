import React, { useContext } from 'react'
import { FormContext } from '../Form'

const FormItem = (props) => {
  const context = useContext(FormContext)
  const { children, name, label } = props

  const renderContent = () => {
    if (React.isValidElement(children) && children.type.displayName === 'input') {
      return (
        <div className="form-item">
          <span className="form-item-label">{label}：</span>
          {children}
        </div>
      )
    }
    return null
  }

  return <FormContext.Provider value={{ ...context, name }}>{renderContent()}</FormContext.Provider>
}

FormItem.displayName = 'formItem'

export default FormItem
