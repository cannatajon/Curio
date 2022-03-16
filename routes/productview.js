const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));

const productCntrl = require('../controllers/productview.js');

router.get('/products/:id', productCntrl.product_get);
router.get('/users/:id', productCntrl.users_page_get);


module.exports = router;