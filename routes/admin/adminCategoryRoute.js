const express = require("express")
const router = express.Router()
const { createCategory, getCategory, getOneCategory, updateOneCategory, deleteOneCategory } = require("../../controllers/admin/categoryController")
const upload = require("../../middlewares/fileupload")

router.post(
    "/",
    upload.single("image"),
    // applying multer middleware will give file metadata in
    // req.file or req.files on rest of the function
    createCategory
)

router.get(
    "/",
    getCategory
)

router.get(
    "/:id", // req.params.id
    getOneCategory
)

router.put(
    "/:id", // req.params.id
    updateOneCategory
)

router.delete(
    "/:id",
    deleteOneCategory
)

module.exports = router