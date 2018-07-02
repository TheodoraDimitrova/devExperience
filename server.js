const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require('body-parser')

const users= require('./routes/api/users')
const profiles= require('./routes/api/profiles')
const posts= require('./routes/api/posts')

const app = express();
//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))//??
app.use(bodyParser.json())//??

//db config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));


  
app.get("/", (req, res) => {
  res.send("Hello teddytyyy");
});

//use routes
app.use('/api/users',users)
app.use('/api/profiles',profiles)
app.use('/api/posts',posts)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port  ${port}`));
