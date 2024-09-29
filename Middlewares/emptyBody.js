// Check Empty Body

module.exports = {
    async ceb(req, res, next){
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({"ResponseCode": 400, "ResponseMessage": "Sorry, Can't accept empty body.", "succeeded": false, "ResponseBody": {} })
         }else{
            next()
         }
    }
}
