exports.up = (knex, Promise) => {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id');
    table.string('value').notNullable();
    table.boolean('done').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('todos');
};