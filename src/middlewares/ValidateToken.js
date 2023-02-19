const jwt = require("jsonwebtoken")

function validateToken (req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")
    if (token == null) {
        return res.status(400).send({
            success: false,
            status: "Bad Request",
            message: "Token not present in request"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>  {
        if (err) {
            return res.status(403).send({
                success: false,
                status: "Invalid Token",
                message: "Token has expired, try logging in again!"
            })
        }
        else {
            req.user = user
            next() //proceed to the next action in the calling function
        }
    })
}

module.exports = validateToken