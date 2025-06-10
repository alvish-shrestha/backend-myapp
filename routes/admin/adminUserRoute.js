const express = require("express")
const router = express.Router()
const { createUser, getUsers, getOneUser, updateOneUser, deleteOneUser } = require("../../controllers/admin/usermanagement")
const { authenticateUser, isAdmin } = require("../../middlewares/authorizedUser")
const upload = require("../../middlewares/fileupload")

router.post(
    "/create",
    upload.single("image"),
    createUser
)

router.get(
    "/",
    authenticateUser,
    isAdmin,
    getUsers
)

router.get(
    "/:id", // req.params.id
    getOneUser
)

router.put(
    "/:id", // req.params.id
    updateOneUser
)

router.delete(
    "/:id",
    deleteOneUser
)

module.exports = router