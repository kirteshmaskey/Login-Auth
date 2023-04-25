const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true
}).then(()=> console.log("Connected to Database")).catch((err)=> {
  console.log("Unable to connect to Database");
  console.log(err);
})