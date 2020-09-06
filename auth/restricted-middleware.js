const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const fullToken = req.headers.authorization;
    console.log(fullToken);
    const secret = process.env.SECRET;
    const token = fullToken.split(' ')[1]
    console.log(token);

    if (fullToken) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Invalid token received" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token received" });
    }
};

/* module.exports = function restricted(req, res, next) {
    const fullToken = req.headers.authorization;
    const secret = process.env.SECRET;

    if (!fullToken) {
        return res.status(401).send('Unauthorized request')
    }
    let token = fullToken.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, secret)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
} */