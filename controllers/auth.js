const {User} = require('../models/User')
const bcrypt = require("bcrypt");
const salt = 10;
const {validationResult} = require('express-validator')
const brands = require('../public/brands.json')
const clothes = require('../public/clothes.json')
const jewellery = require('../public/jewellery.json')

const passport = require('passport');


exports.signup_get = (req,res)=>{
    res.render('auth/signup')
}

exports.signup_post = (req,res)=>{

    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash)
    user.password = hash;

    user.save()
    .then(() => {
        res.redirect('/auth/signin')
        //res.redirect("/article/index");
    })
    .catch((err) => {
        if(err.code == 11000){
            req.flash('error', 'Email already exists');
            res.redirect('/auth/signin')
        }
        else
        {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                //res.status(4000).json({errors: errors.array()})
                req.flash('validationErrors', errors.errors);
             }
            res.redirect('/auth/signup')
            console.log(err);
            //res.send(err);
        }
        // console.log(err);
        // res.send("ERRRRORRRR!!!!!!");
    });
}

exports.auth_signin_get = (req,res)=>{
    res.render('auth/signin.ejs')
}

exports.auth_signin_post = 
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/auth/signin',
        failureFlash: "Invalid user/pass",
        successFlash: "You are signed in sucessfully."

    })

exports.auth_logout_get = (req,res)=>{
    //
    req.logout()
    req.flash("success", "You have been logged out")
    res.redirect('/auth/signin')
}

exports.userpage_get = (req,res)=>{
    const id = req.params.id
    res.render('auth/userpage' , {id})
}

exports.new_item_get = (req,res)=>{
    res.render('auth/newitem', {brands , clothes, jewellery})
    console.log({brands})
}


