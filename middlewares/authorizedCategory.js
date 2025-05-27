const jwt = require("jsonwebtoken")
const User = require("../models/Category")
const Category = require("../models/Category")

exports.authenticateCategory = async (req, res, next) => {
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
        const category = await Category.findOne({
            "_id": decoded._id
        })

        if (!category) {
            return res.status(401).json(
                {
                    "success": false,
                    "message": "Token mismatch"
                }
            )
        }
        req.category = category
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

exports.isAdmin = async (req, res, next) => {
    if (req.category && req.category.role === "admin") {
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