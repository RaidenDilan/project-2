const router        = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');
const secureRoute   = require('../lib/secureRoute');
const resorts       = require('../controllers/resorts');
const upload        = require('../lib/upload');
const users         = require('../controllers/users');
const oauth         = require('../controllers/oauth');

router.get('/', (req, res) => res.render('statics/index'));

// -------------------------------- USER ------------------------------------ //

router.route('/users/:id')
  .get(secureRoute, users.show)
  .post(upload.single('profileImage'), users.update);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/users/:id/images')
  .post(secureRoute, upload.single('userFeed'), users.createImage);

router.route('/users/:id/images/:imageId')
  .delete(secureRoute, users.deleteImage);

// ------------------------------- RESORT ----------------------------------- //

router.route('/resorts')
  .get(secureRoute, resorts.index)
  .post(secureRoute, upload.single('image'), resorts.create);

router.route('/resorts/new')
  .get(secureRoute, resorts.new);

router.route('/resorts/:id')
  .get(resorts.show)
  .put(secureRoute, resorts.update)
  .delete(secureRoute, resorts.delete);

router.route('/resorts/:id/edit')
  .get(secureRoute, resorts.edit);

router.route('/resorts/:id/comments')
  .post(secureRoute, resorts.createComment);

router.route('/resorts/:id/comments/:commentId')
  .delete(secureRoute, resorts.deleteComment);

// ------------------------------- AUTH ------------------------------------- //

router.route('/profile')
  .delete(secureRoute, registrations.delete);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('profileImage'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

// --------------------------------- OAUTH ---------------------------------- //

router.route('/oauth/github')
  .get(oauth.github);

// router.route('/oauth/instagram')
//   .get(oauth.facebook);

// router.route('/oauth/facebook')
//   .get(oauth.facebook);

router.all('*', (req, res) => res.notFound());

module.exports = router;
