const express = require("express");
const { getUserById } = require ("../controller/Authenticated");
const { authenticateToken } = require ("../utils/authMiddleware");
const { getShopsTimesStamps } = require("../controller/user");

const router = express.Router();

router.get("/user/get-shops", authenticateToken , getShopsTimesStamps);

module.exports = router;