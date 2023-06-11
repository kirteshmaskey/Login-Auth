const express = require("express");
const router = new express.Router();
const userdb = require("../schemas/userSchema");
const bcryptjs = require('bcryptjs');
const auth = require("../middleware/auth");

//for user registeration
router.post("/register", async(req, res)=> {
  // console.log(req.body);
  const {name, email, password, confirmPassword} = req.body;


  if(!name || !email || !password || !confirmPassword) {
    res.status(422).json({error: "Enter all details"})
  }

  try {
    const preUser = await userdb.findOne({email: email});

    if(preUser) {
      res.status(412).json({status: 412, message: "User already registered"});
    }else if(password !== confirmPassword) {
      res.status(422).json({error: "Password and Confirm Password do not match"})
    }else {
      const newUser = new userdb({
        name: name,
        email: email,
        password: password,
      });

      // hashing password
      const saveData = await newUser.save();
      res.status(201).json({status: 201, message: "User registered"});

      // console.log("Data saved in DB ::: " + saveData);
    }
  } catch(err) {
    console.log("Error finding existing user");
    console.log(err);
  }
});

//for user login
router.post("/login", async(req, res)=> {
  // console.log(req.body);
  const {email, password} = req.body;

  if(!email) {
    res.status(422).json({error: "Enter Email"})
  }else if(!password) {
    res.status(422).json({error: "Enter Password"})
  }else {
    try {
      const isUser = await userdb.findOne({email: email});

      if(isUser) {
        //decrypt password and compare with password in database
        const isCorrectPassword = await bcryptjs.compare(password, isUser.password);

        if(!isCorrectPassword) {
          res.status(422).json({status: 422, message: "Incorrect Password"});
        }else {
          // res.status(201).json({status: 201, message: "Login Successful"});
          // console.log("Login Successful");

          // generate jwt token
          const token = await isUser.generateAuthtoken();

          // generate cookie
          res.cookie("usertoken", token, {
            expires:new Date(Date.now()+1800000),
            httpOnly:true
          });
          
          // console.log("User :: " + isUser);
          // res.status(201).json({status: 201,isUser});
          res.status(201).json({status: 201, message: "Login Successful", isUser});
        }
      }else {
        res.status(404).json({status: 404, message: "User Not Found"});
      }
    } catch (error) {
      console.log("Error while login :: ", error);
    }
  }
});

//for landingpage-login validation
router.get("/validuser", auth, async(req, res)=> {
  try {
    const user = await userdb.findOne({_id: req.validId});
    res.status(201).json({status:201, user});
  } catch (error) {
    res.status(401).json({status:401, error});
  }
});

// for user Logout
router.get("/logout", auth, async(req, res)=> {
  try {
    // In case multiple tokens are stored then to delete only the current
    // req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
    //   return curelem.token !== req.token
    // });

    // Delete loken when only one token is stored
    req.validUser.token = "";

    res.clearCookie("usertoken");
    // res.clearCookie("usertoken", {path: "/"});
    
    // to save user details after deleting the token 
    req.validUser.save();
  
    res.status(201).json({status:201});
  } catch (error) {
    console.log("Error while logging out ... " + error);
    res.status(401).json({status:401, error});
  }
});


module.exports = router;