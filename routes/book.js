const router = require("express").Router();
const bookController = require("../middleware/controllers/book.controller");
const checkAuth = require("../middleware/check-auth");
const uploadImage = require("../middleware/upload-img");

// @route /book/edit/:bookId
router
  .route("/edit/:bookId")
  .get(checkAuth, (req, res) => {
    res.render("book/edit", { bookId: req.params.bookId });
  })
  .patch(checkAuth, uploadImage.single("file"), bookController.editBook);

// @route /book/:bookId
router
  .route("/:bookId")
  .get(checkAuth, bookController.showOneBook)
  .delete(checkAuth, bookController.deleteBook);

// @route /book/borrow/:bookId
router
  .route("/borrow/:bookId")
  .get(checkAuth, (req, res) => {
    res.render("book/borrow", { bookId: req.params.bookId });
  })
  .post(checkAuth, bookController.borrowBook);

// @route /book/return/:borrowId
router
  .route("/return/:borrowId")
  .get(checkAuth, (req, res) => {
    res.render("book/return", { borrowId: req.params.borrowId });
  })
  .post(checkAuth, bookController.returnBook);

module.exports = router;
