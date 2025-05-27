const express = require("express")
const router = express.Router()
const { createCategory, getCategory, getOneCategory, updateOneCategory, deleteOneCategory } = require("../../controllers/admin/categoryController")

router.post(
    "/",
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