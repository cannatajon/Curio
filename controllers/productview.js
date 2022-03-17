const {User} = require('../models/User')
const {Product} = require('../models/Product')

exports.product_get = (req,res)=>{
    Product.findById(req.params.id , (err, product)=>{
    res.render('product/productview', {product})
    })
}

exports.users_page_get = async (req,res)=>{
    let user = await User.findById(req.params.id)
    let products = await Product.find({sellerId: user.id})
    await res.render('shop/users.ejs', {user , products})
}