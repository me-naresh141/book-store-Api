let express = require("express");
let router = express.Router();
let auth = require("../middelwares/auth");
let Book = require("../models/book");
let Comment = require("../models/comment");

router.post("/:id", auth.verifyToken, (req, res, next) => {
  let id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Book.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, book) => {
        if (err) return next(err);
        Book.findById(id, (err, book) => {
          if (err) return next(err);
          res.send(book);
        });
      }
    );
  });
});
// update comment
router.post("/:id/edit", auth.verifyToken, (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, { new: true }, (err, comment) => {
    if (err) return next(err);
    Book.findById(comment.bookId)
      .populate("comments")
      .exec((err, book) => {
        if (err) return next(err);
        res.send(book);
      });
  });
});

// delete comment
router.get("/:id/delete", auth.verifyToken, (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    Book.findByIdAndUpdate(
      comment.bookId,
      { $pull: { comments: comment._id } },
      (err, book) => {
        if (err) return next(err);
        Book.findById(comment.bookId)
          .populate("comments")
          .exec((err, book) => {
            if (err) return next(err);
            res.send(book);
          });
      }
    );
  });
});
module.exports = router;
