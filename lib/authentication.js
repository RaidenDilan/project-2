const User = require('../models/user');

function authentication(req, res, next) {
  if(!req.session.isAuthenticated) return next(); // check to see if user is logged in and return next(). If no user is logged in then exit this piece of middleware.

  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) return req.session.regenerate(() => res.unauthorized()); // if the user cannot be found log out of the user
      else if (user) {

        req.session.userId = user.id; // set the userId back on the express session
        req.user = user; // set the whole user object to the request object, so we can use the user's details in the controllers
        res.locals.user = user; // set the whole user object to the res.locals so we can use it in the views - user will be in the local to access it from any point
        res.locals.isAuthenticated = true; // set an isAuthenticated boolean so we can show and hide buttons and links

        console.log('user =-=-=-=-=-=-=->', user);
        return next(); // ok we're done, move on to the next piece of middleware
      }
    })
    .catch(next); // handle the any errors with our global error catcher
}

module.exports = authentication;
