const Resort = require('../models/resort');
const rp = require('request-promise');
const { apiKey } = require('../config/environment.js');

function indexRoute(req, res, next) {
  Resort
    .find()
    .populate('createdBy')
    .exec()
    .then((resorts) => res.render('resorts/index', { resorts }))
    .catch(next);
}

function newRoute(req, res) {
  if(req.file) req.body.filename = req.file.key;
  return res.render('resorts/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  req.body.createdBy = req.user;
  req.body = Object.assign({}, req.body);

  Resort
    .create(req.body)
    .then(() => res.redirect('/resorts'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/resorts/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Resort
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((resort) => {
      if(!resort) return res.notFound();
      return res.render('resorts/show', { resort });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  // req.body.createdBy = req.user;

  Resort
    .findById(req.params.id)
    .exec()
    .then((resort) => {
      return res.render('resorts/edit', { resort });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  // if (req.file) req.body.image = req.file.key;

  Resort
    .findById(req.params.id)
    .exec()
    // .then((resort) => {
    //   if (resort.image && req.file) {
    //     s3.removeObjectAsync({ Key: resort.image }).then(() => {
    //       return resort;
    //     });
    //   } else {
    //     return resort;
    //   }
    // })
    .then((resort) => {
      if(!resort) return res.notFound();

      for(const field in req.body) {
        resort[field] = req.body[field];
      }

      return resort.save();
    })
    .then(() => res.redirect(`/resorts/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/resorts/${req.params.id}/edit`, err.toString());
      return next(err);
    });
}

function deleteRoute(req, res, next) {
  Resort
    .findById(req.params.id)
    .exec()
    .then((resort) => {
      if(!resort) return res.notFound();
      return resort.remove();
    })
    .then(() => res.redirect('/resorts'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Resort
  .findById(req.params.id)
  .exec()
  .then((resort) => {
    if(!resort) return res.notFound();

    resort.comments.push(req.body); // create an embedded record
    return resort.save();
  })
  .then((resort) => res.redirect(`/resorts/${resort.id}`))
  .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Resort
  .findById(req.params.id)
  .exec()
  .then((resort) => {
    if(!resort) return res.notFound();
    const comment = resort.comments.id(req.params.commentId);
    comment.remove();

    return resort.save();
  })
  .then((resort) => res.redirect(`/resorts/${resort.id}`))
  .catch(next);
}

function aboutRoute(req, res, next) {
  Resort
    .find()
    .exec()
    .then(() => res.render('resorts/about'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  about: aboutRoute
};
