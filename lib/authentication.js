const User = require('../models/user');

function authentication(req, res, next) {
  if(!req.session.isAuthenticated) return next(); // check to see if user is logged in and return next(). If no user is logged in then exit this piece of middleware.

  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) return req.session.regenerate(() => res.unauthorized()); // if the user cannot be found log out of the user

      req.session.userId = user.id; // set the userId back on the express session
      req.user = user; // set the whole user object to the request object, so we can use the user's details in the controllers
      res.locals.user = user; // set the whole user object to the res.locals so we can use it in the views - user will be in the local to access it from any point
      res.locals.isAuthenticated = true; // set an isAuthenticated boolean so we can show and hide buttons and links

      // console.log('authentication - user =-=-=-=-=-=-=->', user);
      // console.log('authentication - req.session =-=-=-=-=-=-=->', req.session);
      // console.log('authentication - req.user =-=-=-=-=-=-=->', req.user);
      // console.log('authentication - res.locals =-=-=-=-=-=-=->', res.locals);

      // Bluebird requires us to return the next peace of middleware with the return statement but this still shows that the object was not returned in terminal.
      next(); // return next(); // ok we're done, move on to the next piece of middleware
      return null; // return a non-undefined value to signal that we didn't forget to return
    })
    .catch(next); // handle any errors with our global error catcher
}

module.exports = authentication;
