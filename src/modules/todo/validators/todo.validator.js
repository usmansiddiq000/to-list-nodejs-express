'use strict';
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const {body} = require('express-validator');

exports.validationSchema = (method) => {
  switch (method) {
    case 'todo': {
      return [
        body('name')
            .exists({checkFalsy: true})
            .withMessage('name is required')
            .bail()
            .custom(async (value) => {
              const todo = await Todo.findOne({name: value});
              if (todo) {
                return Promise.reject(new Error('todo already exists'));
              }
            })
            .isLength({max: 25})
            .withMessage('name max length should be 25 characters')
            .trim(),
        body('description')
            .exists({checkFalsy: true})
            .withMessage('description is required')
            .bail()
            .isLength({max: 25})
            .withMessage('description max length should be 25 characters')
            .trim(),
      ];
    }
  }
};
