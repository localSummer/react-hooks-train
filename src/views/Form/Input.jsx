import React from 'react'

const Input = (props) => {
  const { value, onChange } = props

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return <input value={value} onChange={handleChange} />
}

Input.displayName = 'input'

export default Input
