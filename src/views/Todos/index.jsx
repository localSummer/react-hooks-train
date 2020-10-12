import React, { useEffect, useState, useRef } from 'react'
import Input from './Input'
import Todo from './Todo'
import { createStore, bindActionCreators } from './store'
import { addActionCreator, updateActionCreator, deleteActionCreator } from './store/actions'
import './index.css'

const Todos = () => {
  let [todos, setTodos] = useState([])
  let [count, setCount] = useState(0)
  let storeRef = useRef(
    createStore(
      {
        todos,
        count,
      },
      {
        todos: setTodos,
        count: setCount,
      }
    )
  )

  useEffect(() => {
    storeRef.current = Object.assign(storeRef.current, {
      todos,
      count,
    })
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
