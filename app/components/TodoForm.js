import React from "react"
import { ThemeConsumer } from '../contexts/theme'

export default class TodoForm extends React.Component {
  state = { todo: '' }
  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({
      todo: ''
    })

    this.props.onSubmit(this.state.todo)
  }
  handleChange = (event) => {
    this.setState({
      todo: event.target.value
    })
  }
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => ( 
          <form className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor="add-todo-input" className='player-label'>Add ToDo
            </label>
            <div className='row player-inputs'>
              <input
                id='add-todo-input'
                type='text'
                className={`input-${theme}`}
                placeholder='yep, add it there...'
                autoComplete='off'
                value={this.state.todo}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${() => theme === 'dark' ? 'light' : 'dark'}-btn`}
                type='submit'
                disabled={!this.state.todo}>
                Submit
            </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}