const jwt = require('jsonwebtoken');
const userdb = require('../schemas/userSchema');
const secretkey = process.env.SECRETKEY;


const auth = async(req, res, next)=> {
  try {
    const token = req.headers.authorize;
    // console.log(token);

    const verifyToken = jwt.verify(token, secretkey);


    const validUser = await userdb.findOne({_id: verifyToken._id});
    // console.log(validUser);

    if(!validUser) {
      throw new Error("User not found");
    }

    req.token = token
    req.validUser = validUser
    req.validId = validUser._id

    next();
  } catch (error) {
      // console.log("Error while validating JWT token");
      // console.log("Error :: " + error);
      res.status(401).json({status:401, message: "No token found"});
  }
  
}

module.exports = auth;