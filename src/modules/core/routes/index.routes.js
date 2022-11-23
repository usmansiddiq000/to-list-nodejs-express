'use strict';

const homeController = require('../controllers/home.controller');
const homePolicy = require('../policies/home.policies');

module.exports = (app) => {
  app.route('/').all(homePolicy.isAllowed).get(homeController.home);
};
