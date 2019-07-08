const User    = require('../models/user');
const oauth   = require('../config/oauth');

function newRoute(req, res) {
  res.render('registrations/new', { oauth });
}

function createRoute(req, res, next) {
  if (req.file) req.body.profileImage = req.file.key;
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.badRequest('/register', err.toString());
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};