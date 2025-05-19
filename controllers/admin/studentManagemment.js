const Student = require("../../models/Student")
const bcrypt = require("bcrypt")

exports.createStudent = async (req, res) => {
    const { stuid, stu_name, stu_email } = req.body

    if (!stuid || !stu_name || !stu_email) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing field"
            }
        )
    }

    try {
        const existingUser = await Student.findOne(
            {
                $or: [{ stuid: stuid }, { stu_email: stu_email }]
            }
        )

        if (existingUser) {
            return res.status(400).json(
                {
                    "success": false, "msg": "Student exists"
                }
            )
        }

        const newStudent = new Student(
            {
                stuid,
                stu_name,
                stu_email
            }
        )
        await newStudent.save()
        return res.status(201).json(
            {
                "success": true,
                "msg": "Student registered"
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

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json(
            {
                "success": true,
                "message": "Data fetched",
                "data": students
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                "success": false,
                "message": "Server error"
            }
        )
    }
}

exports.getOneStudent = async (req, res) => {
    try {
        const _id = req.params.id
        const student = await Student.findById(_id)
        return res.status(200).json(
            {
                "success": true,
                "message": "One student fetched",
                "data": student
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

exports.updateOneStudent = async (req, res) => {
    const { stu_email } = req.body
    const _id = req.params.id
    try {
        const student = await Student.updateOne(
            {
                "_id": _id
            },
            {
                $set: {
                    "stu_email": stu_email
                }
            }
        )

        return res.status(200).json(
            {
                "success": true,
                "message": "Student data updated"
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

exports.deleteOneStudent = async (req, res) => {
    try {
        const _id = req.params.id
        const student = await Student.deleteOne(
            {
                "_id": _id
            },
        )
        console.log(student)
            return res.status(200).json(
                {
                    "success": true,
                    "message": "Student deleted"
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