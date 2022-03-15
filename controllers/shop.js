const { render } = require("express/lib/response")

exports.shop_page_get = (req,res)=>{
    let title = req.params.item
    res.render('shop/shop' , {title});
}