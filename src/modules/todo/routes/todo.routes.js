'use strict';

const todoController = require('../controllers/todo.controller');
const {validationSchema} = require('../validators/todo.validator');
const {validatorErrorHandler} = require('../../core/utils/validator-error-handler');

module.exports = function(app) {
  app.route('/api/todo')
      .post(
          [validationSchema('todo'), validatorErrorHandler],
          todoController.create,
      )
      .get(todoController.getAll);
  app.route('/api/todo/:todoId')
      .put(
          [validationSchema('todo'), validatorErrorHandler],
          todoController.update,
      )
      .get(todoController.getById)
      .delete(todoController.removeById);

  app.param('todoId', todoController.todoById);
};
