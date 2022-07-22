import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function Header ({ name }) {
  return (
    <h1>{name} ToDos</h1>
  )
}

export default class Todos extends React.Component {
  state = { todos: [] }
  handleSubmit = (newTodo) => {
    this.setState((state) => {
      return {
        todos: state.todos.concat(newTodo)
      }
    })
  }
  // handleReset = (oldTodo) => {
  //   this.setState((state) => {
  //     return {
  //       todos: state.todos.filter((todo) => todo )
  //     }
  //   })
  // }
  render() {
    const { todos } = this.state

    return (
      <React.Fragment>
        <Header name={`Francis'`} />
        <TodoList todos={todos} />
        <TodoForm onSubmit={(todo) => this.handleSubmit(todo)} />
      </React.Fragment>
    )
  }
}