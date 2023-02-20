const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const auth_arr = authHeader.split(" ")
    token = auth_arr[1]
    if (token == null) {
        return res.status(400).send({
            success: false,
            status: "Bad Request",
            message: "Token not present in request"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>  {
        if (err) {
            console.log(err)
            return res.status(403).send({
                success: false,
                status: "Invalid Token",
                message: "Token has expired, try logging in again!"
            })
        }
        else {
            req.user = user
            // console.log(req.user)
            next() //proceed to the next action in the calling function
        }
    })
}

module.exports = validateToken