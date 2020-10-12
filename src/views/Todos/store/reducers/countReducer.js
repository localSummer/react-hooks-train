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

export default countReducer
