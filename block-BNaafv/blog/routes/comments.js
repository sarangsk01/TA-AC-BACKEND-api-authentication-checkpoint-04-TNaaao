var express = require('express');
var router = express.Router();
const Comment = require('../models/Comment');
const Article = require('../models/Article');

router.get('/:commentId/edit', (req, res, next) => {
  var commentId = req.params.commentId;
  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment', { comment });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect('/articles/' + comment.articleId);
  });
});

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      comment.articleId,
      {
        $pull: { comments: comment.id },
      },
      (err, article) => {
        if (err) return next(err);
        res.redirect('/articles/' + comment.articleId);
      }
    );
  });
});

// router.get('/:id/likes', (req, res, next) => {
//   var id = req.params.id;
//   Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
//     if (err) return next(err);
//     res.redirect('/comments' + id);
//   });
// });

// router.get('/:id/dislikes', (req, res, next) => {
//   var id = req.params.id;
//   Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
//     if (err) return next(err);
//     res.redirect('/comments' + id);
//   });
// });

module.exports = router;
