'use strict';

const {body} = require('express-validator');

exports.validationSchema = (method) => {
  switch (method) {
    case 'todo': {
      return [
        body('name')
            .exists({checkFalsy: true})
            .withMessage('firstName is required')
            .bail()
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
