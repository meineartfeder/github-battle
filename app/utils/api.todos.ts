const api = `/api/v1/todos`

export interface Todo {
  id: string;
  value: string;
  done: boolean;
}

export function getTodos(): Promise<Todo[]> {
  return fetch(`${api}/`)
    .then((res) => res.json())
    .then((todos) => todos.data)
}

export function addTodo(value: string): Promise<Todo[]> {
  const data = {
    value: value,
    done: false
  }
  return fetch(`${api}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application / json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((todos) => todos.data[0])
}

export function deleteTodo(id: string): Promise<Todo[]> {
  return fetch(`${api}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((todos) => todos.data[0])
}

export function changeTodo(id: string, todo: Todo): Promise<Todo[]> {
  const data = {
    value: todo.value,
    done: todo.done
  }
  return fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application / json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((todos) => todos.data[0])
}