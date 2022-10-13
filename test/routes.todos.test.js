process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server/index');
const knex = require('../server/db/connection');

describe('routes : todos', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  describe('GET /api/v1/todos', () => {
    it('should return all todos', (done) => {
      chai.request(server)
        .get('/api/v1/todos')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [3 todo objects]}
          res.body.data.length.should.eql(3);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'value', 'done'
          );
          done();
        });
    });
  });

  describe('GET /api/v1/todos/:id', () => {
    it('should respond with a single todo', (done) => {
      chai.request(server)
        .get('/api/v1/todos/1')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 todo object}
          res.body.data[0].should.include.keys(
            'id', 'value', 'done'
          );
          done();
        });
    });
    it('should throw an error if the todo does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/todos/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That todo does not exist."}
          res.body.message.should.eql('That todo does not exist.');
          done();
        });
    });
  });


  describe('POST /api/v1/todos', () => {
    it('should return the todo that was added', (done) => {
      chai.request(server)
        .post('/api/v1/todos')
        .send({
          value: 'Write Unit-Tests',
          done: false
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code
          // (indicating that something was "created")
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 todo object}
          res.body.data[0].should.include.keys(
            'id', 'value', 'done'
          );
          done();
        });
    });
    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
        .post('/api/v1/todos')
        .send({
          value: 'Watch the todo Titanic'
        })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 400 status code
          res.status.should.equal(400);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a message key
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe('PUT /api/v1/todos', () => {
    it('should return the todo that was updated', (done) => {
      knex('todos')
        .select('*')
        .then((todo) => {
          const todoObject = todo[0];
          chai.request(server)
            .put(`/api/v1/todos/${todoObject.id}`)
            .send({
              value: "Go shopping"
            })
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": 1 todo object}
              res.body.data[0].should.include.keys(
                'id', 'value', 'done'
              );
              // ensure the todo was in fact updated
              const newtodoObject = res.body.data[0];
              newtodoObject.value.should.not.eql(todoObject.value);
              done();
            });
        });
    });
    it('should throw an error if the todo does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/todos/9999999')
        .send({
          value: "Wash the curtains"
        })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That todo does not exist."}
          res.body.message.should.eql('That todo does not exist.');
          done();
        });
    });
  });

  describe('DELETE /api/v1/todos/:id', () => {
    it('should return the todo that was deleted', (done) => {
      knex('todos')
        .select('*')
        .then((todos) => {
          const todoObject = todos[0];
          const lengthBeforeDelete = todos.length;
          chai.request(server)
            .delete(`/api/v1/todos/${todoObject.id}`)
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": 1 todo object}
              res.body.data[0].should.include.keys(
                'id', 'value', 'done'
              );
              // ensure the todo was in fact deleted
              knex('todos').select('*')
                .then((updatedtodos) => {
                  updatedtodos.length.should.eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it('should throw an error if the todo does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/todos/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That todo does not exist."}
          res.body.message.should.eql('That todo does not exist.');
          done();
        });
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });


});