const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
    try {
        const { firstName, lastName, email, password,role } = req.body;

        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser = await newUser.save();
        return res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { signupUser };
