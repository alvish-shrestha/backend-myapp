const User = require("../models/User")
const bcrypt = require("bcrypt") // maintain hashing for passwords

exports.registerUser = async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body
    try {
        const existingUser = await User.findOne(
            {
                $or: [{ username: username }, { email: email }]
            }
        )

        if (existingUser) {
            return res.status(400).json(
                {
                    "success": false, "msg": "User exists"
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10) // 10 salt/complexity jaty badayo tety complex hudaii janxa

        const newUser = new User(
            {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword
            }
        )
        await newUser.save()
        return res.status(201).json(
            {
                "success": true,
                "msg": "User registered"
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