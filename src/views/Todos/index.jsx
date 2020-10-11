import React, { useEffect, useState } from 'react'
import Input from './Input'
import Todo from './Todo'
import { addActionCreator, updateActionCreator, deleteActionCreator } from './store/actions'
import './index.css'

let store = {
  todos: [],
  count: 0,
}

const Todos = () => {
  let [todos, setTodos] = useState([])
  let [count, setCount] = useState(0)

  useEffect(() => {
    Object.assign(store, {
      todos,
      count,
    })
  }, [todos, count])

  const todoReducer = (state, { type, payload }) => {
    switch (type) {
      case 'add':
        return state.concat(payload)
      case 'update':
        let todos = state.map((item) => {
          if (item.id === payload.id) {
            item.completed = payload.completed
          }
          return item
        })
        return todos
      case 'delete':
        let restTodos = state.filter((item) => item.id !== payload.id)
        return restTodos
      default:
        return state
    }
  }

  const countReducer = (state, { type }) => {
    switch (type) {
      case 'add':
        return state + 1
      case 'delete':
        return state - 1
      default:
        return state
    }
  }

  const combineReducers = (reducers) => {
    return (state, action) => {
      let newState = {}
      for (let key in state) {
        newState[key] = reducers[key] ? reducers[key](state[key], action) : state[key]
      }
      return newState
    }
  }

  const bindActionCreators = (dispatch, bindActions) => {
    let actions = {}
    for (let key in bindActions) {
      actions[key] = (...args) => {
        let action = bindActions[key](...args)
        dispatch(action)
      }
    }
    return actions
  }

  const dispatch = (action) => {
    let updater = {
      todos: setTodos,
      count: setCount,
    }

    if (typeof action === 'function') {
      action(dispatch, () => store)
      return
    }

    let reducer = combineReducers({
      todos: todoReducer,
      count: countReducer,
    })
    let newState = reducer(store, action)
    for (let key in newState) {
      updater[key] && updater[key](newState[key])
    }
  }

  return (
    <div className="todos">
      <Input
        {...bindActionCreators(dispatch, {
          addTodo: addActionCreator,
        })}
      />
      <Todo
        todos={todos}
        {...bindActionCreators(dispatch, {
          updateTodo: updateActionCreator,
          deleteTodo: deleteActionCreator,
        })}
      />
      <p style={{ textAlign: 'center' }}>总数: {count}</p>
    </div>
  )
}

export default Todos
