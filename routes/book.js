var express = require("express");
var router = express.Router();
var Book = require("../models/book");

// create new book
router.post("/new", function (req, res, next) {
  Book.create(req.body, (err, book) => {
    if (err) {
      res.send(err.message);
    }
    res.send("sucess");
  });
});

// find all books
router.get("/", (req, res, next) => {
  Book.find({}, (err, allbooks) => {
    if (err) {
      res.send(err.message);
    }
    res.send(allbooks);
  });
});

// get singal book
router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id, (err, singalbook) => {
    if (err) {
      res.send(err.message);
    }
    res.send(singalbook);
  });
});

// update a book
router.put("/:id", (req, res, next) => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatebook) => {
      if (err) {
        res.send(err.message);
      }
      res.send(updatebook);
    }
  );
});

// delete book

router.delete("/:id", (req, res, next) => {
  Book.findByIdAndDelete(req.params.id, (err, deletebook) => {
    if (err) {
      res.send(err.message);
    }
    res.send(deletebook);
  });
});
module.exports = router;
