const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(400).send('Bad Request');

    try{
        const vertified = jwt.verify(token, process.env.TOKEN_SECRT);
        req.user = vertified;
        next();
    } catch(err) {
        res.status(401).send('Unauthorized');
    }
};