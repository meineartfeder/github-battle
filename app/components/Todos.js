import React from 'react'
import PropTypes from 'prop-types'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

const todoItems = []
todoItems.push({ id: 1, value: "Learn react", done: false });
todoItems.push({ id: 2, value: "Go shopping", done: false });
todoItems.push({ id: 3, value: "Buy flowers", done: false });
todoItems.push({ id: 4, value: "Feed the Cats", done: false });
todoItems.push({ id: 5, value: "Cleanup Bathroom", done: false });
todoItems.push({ id: 6, value: "Answer Mails", done: true });


function Header ({ name }) {
  return (
    <h1>{name} ToDos</h1>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}

Header.defaultProps = {
  name: ''
}

export default class Todos extends React.Component {
  state = { todoItems: todoItems }
  handleSubmit = (task) => {
    todoItems.unshift({ 
      id: todoItems.length + 1, 
      value: task, 
      done: false
    })

    this.setState({
      todoItems: todoItems
    })
  }
  handleReset = (id) => {
    todoItems.splice(id, 1);
    this.setState({
      todoItems: todoItems
    })
  }
  handleDone = (id) => {
    var todo = todoItems[id];
    todoItems.splice(id, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems }); 
  }
  render() {
    const { todoItems } = this.state

    return (
      <React.Fragment>
        <Header />
        <TodoForm addTask={(task) => this.handleSubmit(task)} />
        <TodoList todos={todoItems} onDelete={this.handleReset} onDone={this.handleDone} />
      </React.Fragment>
    )
  }
}