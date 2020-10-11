import React from 'react'

const TodoItem = ({ todoItem, updateTodo, deleteTodo }) => {
  const handleChecked = (e) => {
    updateTodo(todoItem, e.target.checked)
  }

  const handleDelete = () => {
    deleteTodo(todoItem)
  }

  return (
    <li className={`todo-item ${todoItem.completed ? 'todo-item-del' : ''}`}>
      <input type="checkbox" checked={todoItem.completed} onChange={handleChecked} />
      <span>{todoItem.content}</span>
      <em onClick={handleDelete}>删除</em>
    </li>
  )
}

export default TodoItem
