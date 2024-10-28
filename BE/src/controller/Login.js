const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Update the user's last login time
        user.lastLogin = Date.now();
        await user.save();  // Save the updated user

        // Generate token
        const token = generateToken(user);
        return res.status(200).json({ user, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { login };
