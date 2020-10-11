let id = 0

export const addActionCreator = (content) => (dispatch, getState) => {
  // 异步action
  setTimeout(() => {
    let { todos } = getState()
    if (!todos.find((todo) => todo.content === content)) {
      dispatch({
        type: 'add',
        payload: {
          id: ++id,
          content,
          completed: false,
        },
      })
    }
  }, 3000)
}

export const updateActionCreator = (todoItem, completed) => {
  return {
    type: 'update',
    payload: {
      ...todoItem,
      completed,
    },
  }
}

export const deleteActionCreator = (todoItem) => {
  return {
    type: 'delete',
    payload: todoItem,
  }
}
