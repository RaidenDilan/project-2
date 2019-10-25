const User    = require('../models/user');
const Promise = require('bluebird');
const s3      = Promise.promisifyAll({ suffix: 'Async'}, require('../lib/s3'));

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('createdBy pics.createdBy')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      else if (user) return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  // req.body.createdBy = req.user;

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) {
        req.flash('alert', 'You must own this profile');
        return res.redirect(`/users/${user.id}`);
      }
      else return res.render('users/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if (req.file) req.body.profileImage = req.file.key;

  User
    .findById(req.params.id)
    // .then((user) => {
    //   if (user.profileImage && req.file) {
    //     console.log('updateRoute - user ============================================>', user);
    //     console.log('updateRoute - user.profileImage ==================>', user.profileImage);
    //     console.log('updateRoute - req.file ====================================>', req.file);
    //     s3.removeObjectAsync({ Key: user.profileImage }).then(() => {
    //       return user;
    //     });
    //   } else return user;
    // })
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.redirect(`/users/${user.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      return next(err);
    });
}

// function createImageRoute(req, res, next) {
//   if (req.file) req.body.filename = req.file.key;
//   req.body = Object.assign({}, req.body); // For some reason multer's req.body doesn't behave like body-parser's
//   req.user.images.push(req.body);
//
//   req.user
//     .save()
//     .then((user) => res.redirect(`/users/${user.id}`))
//     .catch((err) => {
//       if (err.name === 'ValidationError') return res.badRequest(`/users/${req.user.id}`, err.toString());
//       return next(err);
//     });
// }
//
// function deleteImageRoute(req, res, next) {
//   if (req.file) req.body.filename = req.file.key;
//
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       const image = user.images.id(req.params.imageId);
//       image.remove();
//
//       return user.save();
//     })
//     .then(() => res.redirect(`/users/${req.params.id}`))
//     .catch(next);
// }

module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute
  // createImage: createImageRoute,
  // deleteImage: deleteImageRoute
};
