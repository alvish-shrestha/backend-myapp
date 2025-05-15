const express = require("express")
const router = express.Router()
const { registerStudent, getAllStudents } = require("../controllers/studentController")

router.post(
    "/students",
    registerStudent
)

router.get(
    "/",
    getAllStudents
)

module.exports = router