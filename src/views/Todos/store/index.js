import createStore, { combineReducers } from './redux'
import todoReducer from './reducers/todoReducer'
import countReducer from './reducers/countReducer'

export const initStore = (setter) => {
  return createStore(
    {
      todos: [],
      count: 0,
    },
    setter,
    combineReducers({
      todos: todoReducer,
      count: countReducer,
    })
  )
}
