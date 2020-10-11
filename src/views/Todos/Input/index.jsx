import React, { useState } from 'react'

const Input = ({ addTodo }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    let value = e.target.value.trim()
    setValue(value)
  }

  const handleKeyup = (e) => {
    if (e.keyCode === 13) {
      addTodo(value)
      setValue('')
    }
  }

  return (
    <div className="input-wrap">
      <input type="text" placeholder="请输入代办事项" value={value} onChange={handleChange} onKeyUp={handleKeyup} />
    </div>
  )
}

export default Input
