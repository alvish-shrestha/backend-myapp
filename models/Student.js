const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema(
    {
        stuid: {
            type: String,
            required: true,
            unique: true
        },
        stu_name: {
            type: String,
        },
        stu_email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            default: "normal"
        },
        role: {
            type: String,
            default: "student"
        }
    },
    {
        timestamps: true  // userSchema batw halda timestamp pauxa katy bela create katy bela update gareko grxa
    }
)

module.exports = mongoose.model(
    "Student", StudentSchema
)