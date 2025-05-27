// CRUD
const Category = require("../../models/Category")
const bcrypt = require("bcrypt")

// Create
exports.createCategory = async (req, res) => {
    const { name } = req.body
    // validation
    if (!name) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing field"
            }
        )
    }

    try {
        const existingCategory = await Category.findOne(
            {
                $or: [{ name: name }]
            }
        )

        if (existingCategory) {
            return res.status(400).json(
                {
                    "success": false, "msg": "Category exists"
                }
            )
        }

        const newCategory = new Category(
            {
                name: name
            }
        )
        await newCategory.save()
        return res.status(201).json(
            {
                "success": true,
                "msg": "Category registered"
            }
        )
    } catch (e) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

// Read All
exports.getCategory = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req. query

        let filter = {}

        if (search) {
            filter.$or = [
                    { name: 
                        { 
                            $regex: search, $options: "i"
                        } 
                    }
            ]
        }

        const skip = (page - 1) * limit

        const category = await Category.find(filter)
                    .skip(skip)
                    .limit(Number(limit))

        const total = await Category.countDocuments(filter)

        return res.status(200).json(
            {
                success: true,
                message: "Data fetched",
                data: category,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / limit)
                }
            }
        )
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

exports.getOneCategory = async (req, res) => {
    try {
        const _id = req.params.id // use mongo id
        const category = await Category.findById(_id)
        return res.status(200).json(
            {
                "success": true,
                "message": "One category fetched",
                "data": category
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}

// update
exports.updateOneCategory = async (req, res) => {
    const { name } = req.body
    const _id = req.params.id
    try {
        const category = await Category.updateOne(
            {
                "_id": _id
            },
            {
                $set: {
                    "name": name
                }
            }
        )

        return res.status(200).json(
            {
                "success": true,
                "message": "Category data updated"
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}

// Delete
exports.deleteOneCategory = async (req, res) => {
    try {
        const _id = req.params.id
        const category = await Category.deleteOne(
            {
                "_id": _id
            }
        )
        console.log(category)
        return res.status(200).json(
            {
                "success": true,
                "message": "Category deleted"
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}