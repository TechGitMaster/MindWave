const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if(token.length === 0) {
        res.json({ success: false })
        return;
    }

    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokens) => {
        if(err) {
            res.json({ success: false });
            return;
        }

        req.token = tokens;
        next();
    })
}