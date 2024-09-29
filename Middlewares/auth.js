const jwt = require("jsonwebtoken")
const Promise = require("bluebird")
const userService = require("../Services/userService")

exports.privateAuth = (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let privatekey = process.env.PRIVATE_KEY;
    jwt.verify(token, privatekey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "ResponseCode": 401, "ResponseMessage": "Invalid token", "succeeded": false, "ResponseBody": { token } });
        } else {
            return Promise.resolve(userService.getUserProfileService(decoded.id)).then((data) => {
                if (data) {;
                    req.decoded = decoded
                    next()
                } else {
                    return res.status(401).json({ "ResponseCode": 400, "ResponseMessage": "User not found", "succeeded": false, "ResponseBody": {} })
                }
            })

        }
    })
}