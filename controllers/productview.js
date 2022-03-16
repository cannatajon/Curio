const {User} = require('../models/User')
const {Product} = require('../models/Product')

exports.product_get = (req,res)=>{
    let product = Product.findById(req.params.id , (err, product)=>{
    res.render('product/productview', {product})
    })
}

exports.users_page_get = (req,res)=>{
    let user = User.findById(req.params.id , (err,user)=>{
        res.render('shop/users.ejs', {user})
    })
    
}