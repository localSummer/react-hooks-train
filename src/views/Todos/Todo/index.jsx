import React from 'react'
import TodoItem from '../TodoItem'

const Todo = ({ todos, updateTodo, deleteTodo }) => {
  return (
    todos.length > 0 && (
      <ul className="todo">
        {todos.map((item) => {
          return <TodoItem key={item.id} todoItem={item} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        })}
      </ul>
    )
  )
}
export default Todo
