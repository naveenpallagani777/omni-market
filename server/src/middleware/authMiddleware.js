const config = require("../config");
const jwt = require("jsonwebtoken");

/**
 * Middleware for authentication and role-based authorization
 * @param  {...string} allowedRoles - List of roles allowed to access the route
 */
module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;

            // Role-based access control
            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};