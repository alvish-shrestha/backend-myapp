const jwt = require("jsonwebtoken")
const Student = require("../models/Student")

exports.authenticateStudent = async (req, resizeBy, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json(
                {
                    "success": false,
                    "message": "Authentication required"
                }
            )
        }
        const token = authHeader.split(" ")[1] // get token after Bearer prefix
        const decoded = jwt.verify(token, process.env.SECRET)
        const student = await Student.findOne({
            "_id": decoded._id
        })

        if (!student) {
            return res.status(401).json(
                {
                    "success": false,
                    "message": "Token mismatch"
                }
            )
        }
        req.student = student
        next() // continue to next function
    } catch (err) {
        return res.status(500).json(
            {
                "success": false,

                "message": "Authentication failed"
            }
        )
    }
}

exports.isStudent = async (req, res, next) => {
    if (req.student && req.student.role === "admin") {
        next()
    } else {
        return res.status(403).json(
            {
                "success": false,
                "message": "Admin privilage required"
            }
        )
    }
}