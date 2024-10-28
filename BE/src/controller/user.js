const User = require("../models/User");

async function getShopsTimesStamps(req, res) {
    try {
        // const userId = req.user.id;  // Ensure req.user.id is set by authentication middleware
        const Shops = await User.find({role:"Shop"});  // Use findById to search by _id field


        console.log('shops-------------',Shops)

        return res.status(201).json(Shops);
        
    } catch (error) {
        console.error("Error fetching user:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getShopsTimesStamps };
