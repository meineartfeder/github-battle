import React from 'react'
import PropTypes from 'prop-types'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import queryString from 'query-string'

const todoItems = []
todoItems.push({ id: 1, value: "Learn React", done: false });
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
  componentDidMount () {
    console.log(todoItems);
  }
  componentDidUpdate () {
    console.log(todoItems);
  }
  handleSubmit = (task) => {
    todoItems.push({ 
      id: todoItems.length + 1, 
      value: task, 
      done: false
    })

    this.setState({ todoItems: todoItems }); 
  }
  handleDelete = (id) => {
    console.log(id);
    todoItems.splice(id, 1);
    this.setState({ todoItems: todoItems }); 
  }
  handleDone = (id) => {
    var todo = todoItems[id];
    todo.done = !todo.done;
    this.setState({ todoItems: todoItems }); 
  }
  handleChange = (id, task) => {
    todoItems[id].value = task;
    this.setState({ todoItems: todoItems });
  }
  render() {
    const { todoItems } = this.state
    const { name } = queryString.parse(this.props.location.search)

    return (
      <React.Fragment>
        <Header name={name} />
        <TodoForm addTask={(id, task) => this.handleSubmit(id, task)} />
        <TodoList todos={todoItems} onDelete={this.handleDelete} onDone={this.handleDone} onChange={(id, task) => this.handleChange(id, task)} />
      </React.Fragment>
    )
  }
}