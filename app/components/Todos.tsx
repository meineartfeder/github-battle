import React from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types'
import { getTodos, addTodo, deleteTodo, changeTodo, Todo } from "../utils/api.todos"
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import queryString from 'query-string'

const apiErrorMessage = `Uuupps, heute gibt's leider keine Todos für dich!`

function Header ({ name = '' }) {
  return (
    <h1>{name} ToDos</h1>
  )
}

Header.propTypes = {
  name: PropTypes.string
}

type TodosActions = {
  type: "success",
  todos: Todo[],
} | {
  type: "loading",
  loading: boolean
} | {
  type: "error",
  error: string
}

interface TodosState {
  todos: null | Todo[];
  loading: boolean;
  error: null | string;
}

function todosReducer(state: TodosState, action: TodosActions) {
  if (action.type === 'success') {
    return {
      todos: action.todos,
      error: null,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      todos: null,
      error: null,
      loading: true
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function Todos ({ location }: {location: {search: string}}) {
  const [state, dispatch] = React.useReducer(todosReducer, {
    todos: null,
    error: null,
    loading: true,
  })
  const { todos, loading, error } = state;
  const { name } = queryString.parse(location.search);

  React.useEffect(() => {
    dispatch({type: 'loading', loading: true})

    getTodos()
      .then((todos) => _.orderBy(todos, ['id'], ['asc']))
      .then((todos) => dispatch({ type: 'success', todos: todos }))
      .catch(() => dispatch({ type: 'error', error: apiErrorMessage }))
  }, [])

  const handleSubmit = (todo: string) => {
    addTodo(todo)
      .then((todo) => dispatch({ type: 'success', todos: [...todos, todo]}))
      .catch(() => dispatch({ type: 'error', error: apiErrorMessage }))
  }
  const handleDelete = (id: string) => {
    if (!todos) {
      return;
    }
    _.remove(todos, todo => todo.id === id);

    deleteTodo(id)
      .then(() => dispatch({ type: 'success', todos: todos }))
      .catch(() => dispatch({ type: 'error', error: apiErrorMessage }))
  }
  const changeValueInTodosArray = (id: string, key: 'done' | 'value', value?: string): { todos: Todo[], todo: Todo } => {
    const todo = _.find(todos, { id: id }) as Todo;

    if (key === 'done') {
      todo.done = !todo.done;
    } else if (key === 'value' && value) {
      todo.value = value;
    }

    const newTodos =  _.map(todos, (todo) => todo.id === id ? todo : todo);

    return { 
      'todos': newTodos, 
      'todo': todo
     }
  }
  const handleDone = (id: string) => {
    const newTodos = changeValueInTodosArray(id, 'done');

    changeTodo(id, newTodos.todo)
      .then(() => dispatch({ type: 'success', todos: newTodos.todos }))
      .catch(() => dispatch({ type: 'error', error: apiErrorMessage }))
  }
  const handleChange = (id: string, value: string) => {
    const newTodos = changeValueInTodosArray(id, 'value', value);

    dispatch({ type: 'success', todos: newTodos.todos })
  }
  const handleBlur = (id: string, value: string) => {
    const newTodos = changeValueInTodosArray(id, 'value', value);

     changeTodo(id, newTodos.todo)
       .then(() => dispatch({ type: 'success', todos: newTodos.todos }))
       .catch(() => dispatch({ type: 'error', error: apiErrorMessage }))
  }

  if (error || !todos) {
    return (
      <p className="center-text error">{error}</p>
    )
  }

  return (
    <React.Fragment>
      <Header name={name as string} />
      <TodoForm 
        addTodo={handleSubmit}
      />
      <TodoList 
        todos={todos} 
        onDelete={handleDelete} 
        onDone={handleDone} 
        onChange={handleChange} 
        onBlur={handleBlur} 
        loading={loading}
      />
    </React.Fragment>
  )
}