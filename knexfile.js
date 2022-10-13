const path = require('path');

const BASE_PATH = path.join(__dirname, 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://postgres:admin@localhost:5432/koa_todo_api_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://postgres:admin@localhost:5432/koa_todo_api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};