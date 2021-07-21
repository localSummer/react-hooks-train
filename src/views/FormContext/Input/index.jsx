import React, { useContext } from 'react'
import { FormContext } from '../Form'

const Input = ({ type = 'text' }) => {
  const context = useContext(FormContext)

  const handleChange = (e) => {
    context.handleChange(context.name, e.target.value)
  }

  return <input type={type} value={context.formData[context.name]} onChange={handleChange} />
}

Input.displayName = 'input'

export default Input
