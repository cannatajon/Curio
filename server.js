const express = require('express');
const mongoose = require('mongoose');
var bb = require('express-busboy'); // add this below the logger
require('dotenv').config();
const flash = require('connect-flash')
var app = express();
var methodOverride = require('method-override');

bb.extend(app, { // add this after our app
  upload: true
});

const PORT = process.env.PORT||'3000';

app.use(express.static('public'));
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(methodOverride('_method'));


let session = require('express-session');
let passport = require('./helper/ppconfig');

app.use(session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 360000}
  }))
  
  app.use(express.urlencoded({extended: true}));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use((req,res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();

    next();
  })



//import routes
indexRoute = require('./routes/index')
shopRoute = require('./routes/shop')
authRoute = require('./routes/auth')
productRoute = require('./routes/productview')
//mount routes
app.use('/', indexRoute);
app.use('/', shopRoute)
app.use('/', authRoute)
app.use('/', productRoute)
app.set("view engine", "ejs")

mongoose.connect(process.env.mongoDBURL, {
    useNewUrlParser: true,         
    useUnifiedTopology: true,
  },
  () => {
    
      console.log(`mongodb connected successfully!`);
  });

 

app.listen(PORT, ()=>{
    console.log('connected to', PORT);
})

