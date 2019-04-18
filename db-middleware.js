const uuidv1 = require('uuid/v1');

module.exports = (req, res, next) => {
  if (req.url === '/doors' && req.method === 'POST') {
    req.body.authenticated_users = [1];
    req.body.id = uuidv1();
  }
  next();
};
