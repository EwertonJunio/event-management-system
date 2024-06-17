const jsonWebToken = require('jsonwebtoken');

const authorizationMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Nenhum token, autorização negada' });
    }
    try {
        const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token não é válido' });
    }
};

module.exports = authorizationMiddleware;