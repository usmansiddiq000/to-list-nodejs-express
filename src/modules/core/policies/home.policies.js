'use strict';

// let acl = require('acl');

// eslint-disable-next-line new-cap

// acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = () => {};

exports.isAllowed = (req, res, next) => {
  next();
};
