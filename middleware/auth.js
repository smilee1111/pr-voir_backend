const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Extract the token from request headers

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }


};

module.exports = authMiddleware;