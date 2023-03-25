const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})




// hashing password
userSchema.pre("save", async function(next){
  this.password = await bcryptjs.hash(this.password, 10);

  next()
})

const userdb = new mongoose.model("userDetails", userSchema);


module.exports = userdb;