const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models/User');

//serializeUser
//saving the data to this session
// we can save any data to this session
// id is a unique identifier
passport.serializeUser((user,done)=>{
    done(null, user.id);
})

//deserializeUser
// Reading the information from the database from the user ID (Session)
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    })
})

passport.use(new LocalStrategy(
    {   
        usernameField: "emailAddress",
        passwordField: "password"
    },
    
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  


module.exports = passport;