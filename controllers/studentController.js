const Student = require("../models/Student")
const bcrypt = require("bcrypt") // maintain hashing for passwords

exports.registerStudent = async (req, res) => {
    const { stuid, stu_name, stu_email } = req.body
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

exports.getAllStudents = async (req, res) => {
    try {
        const allStudents = await Student.find()
        if (allStudents) {
            return res.status(200).json(
                {
                    "success": true,
                    "msg": "Students retrieved",
                    "data": allStudents
                }
            )
        }
    } catch (e) {
        res.status(500).json(
            {
                "success": false,
                "message": "Server Error"
            }
        )
    }
}