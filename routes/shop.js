const express = require('express');

const router = express.Router();

router.use(express.urlencoded({extended: true}));

const shopCntrl = require('../controllers/shop');

router.get('/shop/:item', shopCntrl.shop_page_get)


module.exports = router;