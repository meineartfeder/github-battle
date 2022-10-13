exports.seed = (knex, Promise) => {
  return knex('todos').del()
    .then(() => {
      return knex('todos').insert({
        value: 'Learn React',
        done: true
      });
    })
    .then(() => {
      return knex('todos').insert({
        value: 'Feed the Cats',
        done: false
      });
    })
    .then(() => {
      return knex('todos').insert({
        value: 'Clean the Windows',
        done: false
      });
    });
};