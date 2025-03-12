const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    role: { type: String, enum: ["admin","teamJs","teamPhp", "teamIot","teamHr", "Shop","Guest"]},
    isAvailable:{type:Boolean, default:false},
    lastLogin: { type: Date },  // Add field to store login timestamp
});

module.exports = mongoose.model("User",userSchema);
