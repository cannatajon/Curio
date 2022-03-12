const express = require('express');

const router = express.Router();

router.use(express.urlencoded({extended: true}));

const indexCntrl = require('../controllers/index');

router.get('/', indexCntrl.index_get)


module.exports = router;