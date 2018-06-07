const User = require('../models/user');

function authentication(req, res, next) {
  // check to see if user is logged in.
  // if not exit this piece of middleware
  if(!req.session.isAuthenticated) return next();

  // find the user based on the id in the session
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        // if the user cannot be found log out of the user
        return req.session.regenerate(() => res.unauthorized());
      }

      // set the userId back on the seession
      req.session.userId = user.id;

      // set the whole user object to the request object
      // so we can use the user's details in the controllers
      req.user = user;

      // set the whole user object to the res.locals so we can use it in the views - user will be in the local to access it from any point
      res.locals.user = user;
      // set an isAuthenticated boolean so we can show and hide buttons and links
      res.locals.isAuthenticated = true;

      // ok we're done, move on to the next piece of middleware
      next();
    })
    // handle the any errors with our global error catcher
    .catch(next);
}

module.exports = authentication;
