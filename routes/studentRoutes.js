const express = require("express")
const router = express.Router()
const { registerStudent, getAllStudents } = require("../controllers/studentController")

router.post(
    "/students",
    registerStudent
)

router.get(
    "/students",
    getAllStudents
)

module.exports = router