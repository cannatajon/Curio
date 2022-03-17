const {User} = require('../models/User')
const {Product} = require('../models/Product')
const bcrypt = require("bcrypt");
const salt = 10;
const {validationResult} = require('express-validator')
const brands = require('../public/brands.json')
const clothes = require('../public/clothes.json')
const jewellery = require('../public/jewellery.json')
const colors = require('../public/colors.json')

const request = require('request');
const fs = require('fs');

function base64_encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString('base64');
}

const passport = require('passport');
const { unsubscribe } = require('../routes');
const { redirect } = require('express/lib/response');


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
    
    if(req.user){
        Product.find({sellerId:req.user._id})
        .then(product=>{
            res.render('auth/userpage', {product})
        })
    }
    else{
        res.redirect('back')
    }
}

exports.new_item_get = (req,res)=>{
    res.render('auth/newitem', {brands , clothes, jewellery, colors})

}

exports.new_item_post =  (req,res)=>{
    let product = new Product(req.body);
    product.save()
    .then(async()=>{
        let image = base64_encode(req.files.image.file);
        
        const options = {
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: `Client-ID ${process.env.CLIENT_ID}`,
          },
          formData: {
            image: image,
            type: 'base64'
          },
        };
      
         request(options, async function(err, response) {
          if (err) return console.log(err);
          let body = JSON.parse(response.body)
          // Mongoose query here to save to db
          // body.data.link points to imgur url
          product.productImage = body.data.link
          console.log(product.productImage)
            product.save()
            .then(()=>{
                res.redirect(`/profile/${req.user.id}`)
                
            })
        

        
    })
    })
    .catch(()=>{
        req.flash("error", "you suck");
        res.redirect('back');
    })
}


exports.upload_user_photo_post = async (req,res)=>{
        let image = base64_encode(req.files.image.file);
        
        const options = {
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: `Client-ID ${process.env.CLIENT_ID}`,
          },
          formData: {
            image: image,
            type: 'base64'
          },
        };
      
         request(options, async function(err, response) {
          if (err) return console.log(err);
          let body = JSON.parse(response.body)
          // Mongoose query here to save to db
          // body.data.link points to imgur url
          let user = await User.findById(req.user._id)
          user.profileImage = body.data.link
          await user.save();
          await res.redirect(`/profile/${req.user.id}`)
        })
        
      
}

exports.product_delete_get = async(req,res)=>{

    await Product.findByIdAndDelete(req.params.id)
    let user = await User.findById(req.user.id);
    console.log(req.params.id)

    user.products=user.products.filter(product=>{
        String(product._id) !== req.params.id
    })
    user.save()
    res.redirect(`/profile/${req.user.id}`)

}

exports.edit_product_get = (req,res)=>{
    Product.findById(req.params.id , (err, product)=>{
        res.render('product/edit', {product, brands , clothes, jewellery, colors})
    })
    
}

exports.edit_product_post = (req,res)=>{
    console.log(req.body , req.params.id)
    Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/profile/${res.locals.currentUser.id}`);
    })
    .catch(err => {
        console.log(err);
    })
}
