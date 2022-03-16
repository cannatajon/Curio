const {User} = require('../models/User')
const {Product} = require('../models/Product')

exports.index_get = (req,res)=>{
    Product.find()
        .then(product=>{
            res.render('home/index', {product})
        })
}

