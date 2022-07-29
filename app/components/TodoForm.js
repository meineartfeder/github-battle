import React from "react"
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'
import { MdAddCircle } from 'react-icons/md'

export default class TodoForm extends React.Component {
  state = { task: '' }
  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({
      task: ''
    })

    this.props.addTask(this.state.task)
  }
  handleChange = (event) => {
    this.setState({
      task: event.target.value
    })
  }
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => ( 
          <form className='todo-form' onSubmit={this.handleSubmit}>
            <label htmlFor="add-todo-input" className='todo-form__label'>Add ToDo</label>
            <div className='row todo-form__inputs'>
              <input
                id='add-todo-input'
                type='text'
                className={`input-${theme}`}
                autoComplete='off'
                value={this.state.task}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'dark' : 'light'}-btn`}
                type='submit'
                title='Submit'
                disabled={!this.state.task}>
                <MdAddCircle size={26} />
            </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}

TodoForm.propTypes = {
  addTask: PropTypes.func.isRequired
}