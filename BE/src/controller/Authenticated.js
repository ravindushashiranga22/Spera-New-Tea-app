const User = require("../models/User");

async function getUserById(req, res) {
    try {
        const userId = req.user.id;  // Ensure req.user.id is set by authentication middleware
        const user = await User.findById(userId);  // Use findById to search by _id field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getUserById };
