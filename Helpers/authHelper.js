const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const helperFunctions = {

    decodeAndVerifyToken: async(reqObj, tempKey) => {
        let token = reqObj.headers.authorization.split(" ")[1];
        const key  = tempKey ? tempKey : process.env.PRIVATE_KEY;
        return Promise.resolve(jwt.verify(token, key))
    },
    
    sendToken: async (payload, tempKey, expire) => {
        const key = tempKey ? tempKey : process.env.PRIVATE_KEY;
        const expiresIn = expire ? expire : "1d";
        return Promise.resolve(jwt.sign(payload, key, { expiresIn: expiresIn }));
    },

    bcryptPass: async (password)=>{
        let salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)
        return hashPassword 
    },

    comparePass: async (bodyPass, userPass)=>{
        const bcryptPass =  await bcrypt.compare(bodyPass, userPass)
        return bcryptPass
    }

}

module.exports = helperFunctions;