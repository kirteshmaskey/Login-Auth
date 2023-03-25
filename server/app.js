const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");


const PORT = 8000;


// app.get("/", (req, res)=> {
//     res.status(201).json("Server Started");
// });

app.use(express.json()); // as we will pass user data in json form
app.use(cors());
app.use(router);

app.listen(PORT, ()=> {
    console.log(`Server running at port number: ${PORT}`);
});