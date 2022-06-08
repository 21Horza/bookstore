const upload = require("../middleware/fileUpload");
const fileController = require('../controllers/fileController');
const fileRouter = require("express").Router();

fileRouter.post("/upload", upload.single("file"), fileController.upload);
fileRouter.get("/files", fileController.getAll)
fileRouter.get("/files/:fileId", fileController.getOne)
fileRouter.get("/image/:filename", fileController.displayOne)
fileRouter.delete('/files/:id', fileController.deleteOne);

module.exports = fileRouter;