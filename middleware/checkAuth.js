const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const utils = require('../utils/response');
const dotenv = require('dotenv');

dotenv.config({
    path:"/config/.env"
});

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: decode.userid},"-__v -password");
        if(!user){
            return utils.response(res, 'fail', 'Invalid User Token', null, 401)
        }
        
        req.userData = decode;
        req.user = user;
        next();
    }catch(error){
        utils.response(res, 'fail', 'Fail to Auth', null, 401)
    }
}