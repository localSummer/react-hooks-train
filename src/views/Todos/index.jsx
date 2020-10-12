import React, { useEffect, useState } from 'react'
import Input from './Input'
import Todo from './Todo'
import { initStore } from './store'
import { bindActionCreators, setState, getState } from './store/redux'
import { addActionCreator, updateActionCreator, deleteActionCreator } from './store/actions'
import './index.css'

const Todos = () => {
  let [todos, setTodos] = useState([])
  let [count, setCount] = useState(0)

  useEffect(() => {
    initStore({
      todos: setTodos,
      count: setCount,
    })
  }, [])

  useEffect(() => {
    let newState = Object.assign(getState(), {
      todos,
      count,
    })
    setState(newState)
  }, [todos, count])

  return (
    <div className="todos">
      <Input
        {...bindActionCreators({
          addTodo: addActionCreator,
        })}
      />
      <Todo
        todos={todos}
        {...bindActionCreators({
          updateTodo: updateActionCreator,
          deleteTodo: deleteActionCreator,
        })}
      />
      <p style={{ textAlign: 'center' }}>总数: {count}</p>
    </div>
  )
}

export default Todos
