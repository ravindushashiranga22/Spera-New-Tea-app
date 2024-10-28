const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    
    // Check if Authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const [bearer, token] = authHeader.split(" ");  // Split by space to separate 'Bearer' from token
    
    // Validate the format of the token
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        
        req.user = user;  // Attach the user information from the token to the request object
        next();  // Proceed to the next middleware/route handler
    });
}

module.exports = { authenticateToken };
