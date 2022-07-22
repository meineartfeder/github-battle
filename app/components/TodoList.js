import React from "react";
import { FaTimesCircle } from 'react-icons/fa'
import PropTypes from "prop-types";

function TodoListItem({ todos, onReset }) {
  return (
    <React.Fragment>
      {todos.map((todo, index) => (
        <li key={index} className="todo-list__item">
          #todo{ index + 1 } { todo }

          <button className='btn-clear flex-center' onClick={onReset}>
            <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
          </button>
        </li>
      ))}
    </React.Fragment>
  )
}

TodoListItem.propTypes = {
  todos: PropTypes.array.isRequired
}

export default function TodoList({ todos, children }) {
  return (
    <ul className="todo-list">
      <TodoListItem todos={todos}>
        {children}
      </TodoListItem> 
    </ul>
  )
}