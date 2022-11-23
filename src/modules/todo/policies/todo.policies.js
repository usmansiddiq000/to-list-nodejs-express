'use strict';

let acl = require('acl');

// eslint-disable-next-line new-cap
acl = new acl(new acl.memoryBackend());


// roles and api permissions (Show case)
exports.invokeRolesPolicies = () => {
  acl.allow([
    {
      roles: ['admin'],
      allows: [
        {
          resources: '/api/todo',
          permissions: '*',
        },
      ],
    },
  ]);
};

exports.isAllowed = (req, res, next) => {
  // Logic to make sure user has access to api.
  next();
};

