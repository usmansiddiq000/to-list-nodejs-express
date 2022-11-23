const {validationResult} = require('express-validator');
const {handle422} = require('./responses');
exports.validatorErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handle422(res, errors.array());
  }
  next();
};
