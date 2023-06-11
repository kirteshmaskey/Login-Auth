const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secretkey = "jairamjaishreerambolojaishreeram";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Not a valid email");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token: {
    type: String,
  }
})




// hashing password
userSchema.pre("save", async function(next){
  if(this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next()
})

// to generate jwt token
userSchema.methods.generateAuthtoken = async function(req, res) {
  try {
    let tkn = jwt.sign({_id:this._id}, secretkey,{
      expiresIn:"1d"
    });

    this.token = tkn;
    await this.save();
    return tkn;
  } catch (error) {
    console.log("Error generating JWT token :: " + error);
    res.status(422).json(error);
  }
}

const userdb = new mongoose.model("userDetails", userSchema);


module.exports = userdb;