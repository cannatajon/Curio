const express = require('express');
const {body} = require('express-validator')
const router = express.Router();
router.use(express.urlencoded({extended: true}));

const authCntrl = require('../controllers/auth');

router.get('/auth/signup', authCntrl.signup_get);
router.post('/auth/signup',[
    body('firstName').isLength({min : 1}).withMessage('First Name can not be empty'),
    body('lastName').isLength({min : 1}).withMessage('Last Name can not be empty'),
    body('emailAddress').isEmail(),
    body('password').isLength({min : 8}).withMessage('password must be at least 8 characters long')
], authCntrl.signup_post);

router.get('/auth/signin', authCntrl.auth_signin_get);
router.post('/auth/signin', authCntrl.auth_signin_post);

router.get('/auth/logout', authCntrl.auth_logout_get)

router.get('/profile/:id', authCntrl.userpage_get)

router.get("/profile/:id/newpost", authCntrl.new_item_get)


module.exports = router;