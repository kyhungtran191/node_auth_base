const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: "Unauthorized Token",
            message: "Please provide token"
        })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = decoded.id
            next();
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(403)
        }
    }
}
module.exports = {
    verifyToken
}