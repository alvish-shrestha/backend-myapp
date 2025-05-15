const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/mydb",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log("Mongodb connected");
    } catch (err) {
        console.log("DB error", err);
    }
}
module.exports = connectDB