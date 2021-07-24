let store = {}

let updater = {}

let reducer

export const createStore = (state, setter, combineReducer) => {
  store = state
  updater = setter
  reducer = combineReducer
}

export const getState = () => store

export const setState = (state) => {
  store = state
}

/**
 * 合并reducer为一个新的reducer
 * @param reducers
 * @returns {function(*, *=): {}}
 */
export const combineReducers = (reducers) => {
  /** 返回新的reducer */
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

  let newState = reducer(store, action)
  for (let key in newState) {
    updater[key] && updater[key](newState[key])
  }
}

export default createStore
