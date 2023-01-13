const { json } = require("express");
var express = require("express");
const { response } = require("../app");
var router = express.Router();
var Book = require("../models/book");

// create new book
router.post("/new", async (req, res, next) => {
  try {
    let newBook = await Book.create(req.body);
    console.log(newBook);
    res.send(newBook);
  } catch (error) {
    res.status(400).json(error);
  }
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

// edit category
router.put("/:id/editCategory", async (req, res, next) => {
  try {
    let editCategoryBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(editCategoryBook);
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete category
router.delete("/:category/delete", async (req, res, next) => {
  try {
    let deletbook = await Book.deleteMany(req.body);
    res.send(deletbook);
  } catch (error) {
    res.status(400).res.json(error);
  }
});

// list all categories
router.get("/category/category", async (req, res, next) => {
  try {
    let catgory = [];
    let allCategory = await Book.find({});
    allCategory.forEach((elm) => {
      catgory.push(elm.category);
      res.send(catgory);
    });
  } catch (error) {
    res.status(400).res.json(error);
  }
});

// count books for each category
router.get("/:category/count", async (req, res, next) => {
  try {
    let totalBook = await Book.find(req.params);
    res.send({ count: totalBook.length });
  } catch (error) {
    res.status(400).json(error);
  }
});
// list books by author
router.get("/:author/author", async (req, res, next) => {
  try {
    let books = await Book.find(req.params);
    res.send(books);
  } catch (error) {
    res.status(400).json(error);
  }
});

// list all tags
router.get("/tag", (req, res, next) => {
  Book.find({}, (err, book) => {
    book.forEach((b) => {
      console.log(b.tags);
    });
  });
});

module.exports = router;
