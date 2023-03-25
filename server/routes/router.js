const express = require("express");
const router = new express.Router();
const userdb = require("../schemas/userSchema");


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
      res.status(422).json({error: "Email already exist"})
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
      

      // console.log("Data saved in DB ::: " + saveData);
    }
  } catch(err) {
    console.log("Error finding existing user");
    console.log(err);
  }
});


module.exports = router;