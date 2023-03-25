const mongoose = require("mongoose");

const DB = "mongodb+srv://kirteshmaskey:kwfQjBwZVOWCxvz9@cluster0.c3yjyyk.mongodb.net/Login-Auth?retryWrites=true&w=majority";

mongoose.connect(DB, {
  useNewUrlParser: true
}).then(()=> console.log("Connected to Database")).catch((err)=> {
  console.log("Unable to connect to Database");
  console.log(err);
})