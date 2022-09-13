import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineDeleteOutline, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

function TodoListItem({ id, todo, done, onDelete, onDone, onChange }) {
  const [ value, setValue ] = React.useState(todo);

  React.useEffect(() => {
    setValue(todo)
  }, [todo])

  const onClickDelete = () => {
    onDelete(id)
  }
  const onClickDone = () => {
    onDone(id)
  }
  const onItemChange = (e) => {
    e.preventDefault()

    onChange(id, e.target.value)
  }

  return (
    <li
      className={`todo-list__item${done ? ' todo-list__item--done' : ''}`}
    >
      {done === true
        ? <button className="btn-done" onClick={onClickDone}>
          <MdCheckBox size={26} />
          <span className="sr-only">Undone</span>
        </button>
        : <button className="btn-done" onClick={onClickDone}>
          <MdCheckBoxOutlineBlank size={26} />
          <span className="sr-only">Done</span>
        </button>
      }
      <input
        className="todo-list__item__input"
        type="text"
        value={value}
        onChange={onItemChange}
      />
      <button className="btn-clear" onClick={onClickDelete}>
        <MdOutlineDeleteOutline color="#FFFFFF" size={26} />
      </button>
    </li>
  )
}

TodoListItem.propTypes = {
  id: PropTypes.number.isRequired,
  todo: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default function TodoList ({ todos, onDelete, onDone, onChange }) {
  return (
    <React.Fragment>
      <ul className='todo-list'>
        {todos.map((todo, index) => {
          return (
            <TodoListItem key={index} todo={todo.value} done={todo.done} id={index} onDelete={onDelete} onDone={onDone} onChange={onChange} />
          )
        })}
      </ul>
    </React.Fragment>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}