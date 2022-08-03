import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineDeleteOutline, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

class TodoListItem extends React.Component {
  state = {
    task: this.props.task
  }
  onClickDelete = () => {
    this.props.onDelete(this.props.id)
  }
  onClickDone = () => {
    this.props.onDone(this.props.id)
  }
  onItemChange = (event) => {
    event.preventDefault();

    this.setState({
      task: event.target.value
    })

    this.props.onChange(this.props.id, event.target.value)
  }
  render() {
    const { task, done } = this.props
    return (
      <li
        className={`todo-list__item${done ? ' todo-list__item--done' : ''}`}
      >
        {done === true
          ? <button className='btn-done' onClick={this.onClickDone}>
              <MdCheckBox size={26} />
              <span className="sr-only">Undone</span>
            </button>
          : <button className='btn-done' onClick={this.onClickDone}>
              <MdCheckBoxOutlineBlank size={26} />
              <span className="sr-only">Done</span>
            </button>
        }
        <input 
          className='todo-list__item__input' 
          type="text" 
          value={task} 
          onChange={this.onItemChange}
        />
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
  onDone: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default class TodoList extends React.Component {
  render() {
    // console.log(this.props.todos);
    const undoneItems = this.props.todos.map((task, index) => {
      if(task.done === false) {
        return (
          <TodoListItem key={index} task={task.value} done={task.done} id={index} onDelete={this.props.onDelete} onDone={this.props.onDone} onChange={this.props.onChange} />
        )
      } 
    })
    const doneItems = this.props.todos.map((task, index) => {
      if (task.done === true) {
        return (
          <TodoListItem key={index} task={task.value} done={task.done} id={index} onDelete={this.props.onDelete} onDone={this.props.onDone} onChange={this.props.onChange} />
        )
      }
    })
    return (
      <React.Fragment>
        <ul className='todo-list'>
          {undoneItems}
          {doneItems}
        </ul>
      </React.Fragment>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}