const mongoose = require("mongoose");
const Book = require("../../models/books.model");
const Borrow = require("../../models/borrow.model");

// @route "/book/:bookId"

// @desc GET Show one book
const showOneBook = async (req, res, next) => {
  try {
    let book = await Book.findOne({
      _id: req.params.bookId,
    }).lean();
    let borrows = await Borrow.find({
      book: req.params.bookId,
    }).lean();
    if (book) {
      res.render("book/main", { book: book, borrows: borrows, user: req.user });
      //res.status(200).json({ book, borrows });
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @desc DELETE Delete one book
const deleteBook = async (req, res, next) => {
  try {
    let book = await Book.findOne({
      _id: req.params.bookId,
    }).lean();
    if (book) {
      await Borrow.deleteMany({ book: req.params.bookId }).then(
        await Book.deleteOne({ _id: req.params.bookId }).then(
          res.redirect("/shelf/" + book.shelf)
        )
      );
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @desc PATCH edit one book
const editBook = async (req, res, next) => {
  try {
    let updated;
    if (req.file) {
      updated = await Book.updateOne(
        { _id: req.params.bookId },
        { $set: req.body, $set: { image: req.file.path } }
      );
    } else {
      updated = await Book.updateOne(
        { _id: req.params.bookId },
        { $set: req.body }
      );
    }
    if (updated.n) {
      const book = await Book.findOne({
        _id: req.params.bookId,
      }).lean();
      res.redirect("/shelf/" + book.shelf);
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @route "/book/borrow/:bookId"

// @desc POST borrow book
const borrowBook = async (req, res, next) => {
  // console.log(req.body);
  const newBorrow = {
    book: req.params.bookId,
    name: req.body.name,
    dateBorrowed: new Date(req.body.dateBorrowed),
    dueDate: new Date(req.body.dueDate),
  };
  // console.log(newBorrow);
  try {
    const borrow = await Borrow.create(newBorrow);
    res.redirect("/book/" + req.params.bookId);
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// @route "/book/return/:borrowId"

// @desc POST return book
const returnBook = (req, res, next) => {
  try {
    Borrow.findById(req.params.borrowId, async (error, borrow) => {
      if (error || !borrow) {
        if (error) {
          console.log(error);
          res.status(500);
          next(error);
        } else {
          res.status(404);
          next();
        }
      } else {
        borrow.returned = true;
        borrow.dateReturned = new Date(req.body.dateReturned);
        borrow.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/book/" + borrow.book);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

module.exports = {
  showOneBook,
  deleteBook,
  editBook,
  borrowBook,
  returnBook,
};
