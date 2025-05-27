const express = require("express")
const router = express.Router()
const productController = require("../../controllers/admin/productmanagement")
// const {createProduct} = require("../../controllers/admin/productmanagement")

router.post(
    "/",
    productController.createProduct // using dot, call function
)

router.get(
    "/",
    productController.getProducts
)

module.exports = router