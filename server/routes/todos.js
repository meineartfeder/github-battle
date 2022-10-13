const Router = require('koa-router');
const queries = require('../db/queries/todos');

const router = new Router();
const BASE_URL = `/api/v1/todos`;

router.get(BASE_URL, async (ctx) => {
  try {
    const todos = await queries.getAllTodos();
    ctx.body = {
      status: 'success',
      data: todos
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const todo = await queries.getSingleTodo(ctx.params.id);
    if (todo.length) {
      ctx.body = {
        status: 'success',
        data: todo
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That todo does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const todo = await queries.addTodo(ctx.request.body);
    if (todo.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: todo
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const todo = await queries.updateTodo(ctx.params.id, ctx.request.body);
    if (todo.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: todo
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That todo does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const todo = await queries.deleteTodo(ctx.params.id);
    if (todo.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: todo
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That todo does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;