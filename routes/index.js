const express = require('express');
const {registerController} = require('../controllers');
const {loginController} = require('../controllers');
const {userController} = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register' , registerController.register)
router.post('/login' , loginController)
router.get('/me', auth, userController)




module.exports = {router}