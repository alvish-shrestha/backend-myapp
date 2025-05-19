const express = require("express")
const router = express.Router()
const { createStudent, getStudents, getOneStudent, updateOneStudent, deleteOneStudent } = require("../../controllers/admin/studentManagemment")

router.post(
    "/create",
    createStudent
)

router.get(
    "/",
    getStudents
)

router.get(
    "/:id",
    getOneStudent
)

router.put(
    "/:id",
    updateOneStudent
)

router.delete(
    "/:id",
    deleteOneStudent
)

module.exports = router