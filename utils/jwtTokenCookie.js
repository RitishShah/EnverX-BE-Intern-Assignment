const dotenv = require('dotenv');

dotenv.config({
    path:"config/.env"
});

// create token and saving that in cookies
exports.sendToken = (res, token) =>{
    // Options for cookies
   const options = {
       expires: new Date(
           Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
       ),
       httpOnly: true
   };
   res.cookie("jwt",token,options);
}