const router = require("express").Router();
const shelfController = require("../middleware/controllers/shelf.controller");
const checkAuth = require("../middleware/check-auth");
const uploadImage = require("../middleware/upload-img");

// @route /shelf/
router
  .route("/")
  .get(checkAuth, shelfController.showShelves)
  .delete(checkAuth, shelfController.deleteAllShelves);

// @route /shelf/newshelf
router
  .route("/newshelf")
  .get(checkAuth, (req, res) => {
    res.render("shelf/new");
  })
  .post(checkAuth, shelfController.newShelf);

// @route /shelf/newbook/:shelfId
router
  .route("/newbook/:shelfId")
  .get(checkAuth, (req, res) => {
    res.render("book/new", { shelfId: req.params.shelfId });
  })
  .post(checkAuth, uploadImage.single("file"), shelfController.newBook);

router
  .route("/edit/:shelfId")
  .get(checkAuth, (req, res) => {
    res.render("shelf/edit", { shelfId: req.params.shelfId });
  })
  .patch(checkAuth, shelfController.editShelf);

// @route /shelf/:shelfId
router
  .route("/:shelfId")
  .get(checkAuth, shelfController.showBooks)
  .delete(checkAuth, shelfController.deleteShelf);

module.exports = router;
