const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true  // userSchema batw halda timestamp pauxa katy bela create katy bela update gareko grxa
    }
)

module.exports = mongoose.model(
    "Category", CategorySchema
)