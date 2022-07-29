import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineDeleteOutline, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

class TodoListItem extends React.Component {
  state = {
    done: this.props.done
  }
  onClickDelete = () => {
    this.props.onDelete(this.props.id)
  }
  onClickDone = () => {
    this.props.onDone(this.props.id)
  }
  render() {
    const { task, done } = this.props
    return (
      <li
        className={`todo-list__item ${done ? 'todo-list__item--done' : null}`}
      >
        <button className='btn-done' onClick={this.onClickDone}>
          {done === true
            ? <React.Fragment>
              <MdCheckBox size={26} />
              <span className="sr-only">Undone</span>
            </React.Fragment>
            : <React.Fragment>
              <MdCheckBoxOutlineBlank size={26} />
              <span className="sr-only">Done</span>
            </React.Fragment>
          }
        </button>
        {task}
        <button className='btn-clear' onClick={this.onClickDelete}>
          <MdOutlineDeleteOutline color='#FFFFFF' size={26} />
        </button>
      </li>
    )
  }
}

TodoListItem.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

export default class TodoList extends React.Component {
  render() {
    const items = this.props.todos.map((task, index) => {
      return (
        <TodoListItem key={index} task={task.value} done={task.done} id={index} onDelete={this.props.onDelete} onDone={this.props.onDone} />
      )
    })
    return (
      <React.Fragment>
        <ul className='todo-list'>
          {items}
        </ul>
      </React.Fragment>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}