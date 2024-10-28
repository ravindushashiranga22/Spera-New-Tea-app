const express = require("express");
const { signupUser } = require("../controller/Signup");
const { authenticateToken } = require("../utils/authMiddleware");
const { getShopsTimesStamps } = require("../controller/user");

const router = express.Router();

router.post("/register", signupUser);

router.get("/get-shops" , getShopsTimesStamps);


module.exports = router;