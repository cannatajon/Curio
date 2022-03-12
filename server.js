const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.use(express.static('public'));
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//import routes
indexRoute = require('./routes/index')
//mount routes
app.use('/', indexRoute);

app.set("view engine", "ejs")

mongoose.connect(process.env.mongoDBURL, {
    useNewUrlParser: true,         
    useUnifiedTopology: true,
  },
  () => {
      console.log("mongodb connected successfully!");
  });

app.listen(PORT, ()=>{
    console.log('connected to', PORT);
})