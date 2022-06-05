const bookController = require("../controllers/bookController");
const bookRouter = require("express").Router();
const verifyRole = require("../middleware/verifyRole");

bookRouter.post("/create", verifyRole(["USER"]), bookController.createBook);
bookRouter.get("/info", verifyRole(["USER"]), bookController.getAllBooks);
bookRouter.get("/info/:id", verifyRole(["USER"]), bookController.getOneBook);

module.exports = bookRouter;