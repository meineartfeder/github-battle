const knex = require('../connection');

function getAllTodos() {
  return knex('todos')
    .select('*');
}

function getSingleTodo(id) {
  return knex('todos')
    .select('*')
    .where({ id: parseInt(id) });
}

function addTodo(todo) {
  return knex('todos')
    .insert(todo)
    .returning('*');
}

function updateTodo(id, todo) {
  return knex('todos')
    .update(todo)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteTodo(id) {
  return knex('todos')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};