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

export default todoReducer
