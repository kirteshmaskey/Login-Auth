require("dotenv").config();
require("./db/conn");

const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require('cookie-parser');


const port = process.env.PORT || 8000;


// app.get("/", (req, res)=> {
//     res.status(201).json("Server Started");
// });

app.use(express.json()); // as we will pass user data in json form
app.use(cors());
app.use(cookieParser());
app.use(router);

app.listen(port, ()=> {
    console.log(`Server running at port number: ${port}`);
});