import React from "react"
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
import { MdAddCircle } from 'react-icons/md'

export default function TodoForm ({ addTask }) {
  const [ task, setTask ] = React.useState('')
  const theme = React.useContext(ThemeContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(task)
    setTask('')
  }

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="add-todo-input" className="todo-form__label">Add ToDo</label>
      <div className='row todo-form__inputs'>
        <input
          id='add-todo-input'
          type='text'
          className={`input-${theme}`}
          autoComplete='off'
          value={task}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === 'dark' ? 'dark' : 'light'}-btn`}
          type='submit'
          title='Submit'
          disabled={!task}>
          <MdAddCircle size={26} />
        </button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  addTask: PropTypes.func.isRequired
}