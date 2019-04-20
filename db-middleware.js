const fs = require('fs');
const uuidv1 = require('uuid/v1');

// This id should be itentical to the id for "admin" that is in the database
const adminId = 'be425a90-62d0-11e9-8cc0-49ceb88f6671';

module.exports = (req, res, next) => {
  if (req.url === '/doors' && req.method === 'POST') {
    req.body.authenticated_users = [adminId];
    req.body.id = uuidv1();
    next();
  } else if (req.url === '/users' && req.method === 'POST') {
    req.body.id = uuidv1();
    req.body.isAdmin = false;
    next();
  } else if (req.method === 'POST' && req.url === '/events') {
    const { doorId, userId } = req.body;

    // Because we are mocking a backend, we need a way to get additional
    // information about authorization of a door. We shouldn't trust the
    // client though so let's read the database here to make sure the
    // user actually has the permissions necessary.
    const file = fs.readFileSync('db.json');
    const dbContent = JSON.parse(file);

    // We need to check that the user has access to the door
    const door = dbContent.doors.find(door => door.id === doorId);
    const userHasAuth = door.authenticated_users.includes(userId);

    req.body.time = new Date();
    req.body.authorized = userHasAuth;

    // Continue on
    next();
  } else if (req.method === 'DELETE' && req.url.includes(adminId)) {
    // Don't allow the admin user to be deleted
    res.sendStatus(403);
  } else {
    next();
  }
};
