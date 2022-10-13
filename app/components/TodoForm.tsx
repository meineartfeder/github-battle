import React, { ChangeEvent, FormEvent } from "react"
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
import { MdAddCircle } from 'react-icons/md'

export default function TodoForm ({ addTodo }: {
  addTodo: (todo: string) => void
}) {
  const [ todo, setTodo ] = React.useState('')
  const theme = React.useContext(ThemeContext)

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    addTodo(todo)
    setTodo('')
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
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
          value={todo}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === 'dark' ? 'dark' : 'light'}-btn`}
          type='submit'
          title='Submit'
          disabled={!todo}>
          <MdAddCircle size={26} />
        </button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
}