const express = require("express");
const router = new express.Router();
const userdb = require("../schemas/userSchema");
const bcryptjs = require('bcryptjs');

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
      res.status(412).json({status: 412, message: "User registered"});
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
          res.status(201).json({status: 201, message: "Login Successful"});
          console.log("Login Successful");
        }
      }else {
        res.status(404).json({status: 404, message: "User Not Found"});
      }
    } catch (error) {
      console.log("Error while login :: ", error);
    }
  }

});


module.exports = router;