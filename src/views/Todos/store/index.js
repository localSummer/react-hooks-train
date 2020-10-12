import todoReducer from './reducers/todoReducer'
import countReducer from './reducers/countReducer'

let store = {}

let updater = {}

export const createStore = (state, setter) => {
  store = state
  updater = setter
  return store
}

export const getState = () => store

export const combineReducers = (reducers) => {
  return (state, action) => {
    let newState = {}
    for (let key in state) {
      newState[key] = reducers[key] ? reducers[key](state[key], action) : state[key]
    }
    return newState
  }
}

export const bindActionCreators = (bindActions) => {
  let actions = {}
  for (let key in bindActions) {
    actions[key] = (...args) => {
      let action = bindActions[key](...args)
      dispatch(action)
    }
  }
  return actions
}

export const dispatch = (action) => {
  if (typeof action === 'function') {
    action(dispatch, getState)
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

export default store
