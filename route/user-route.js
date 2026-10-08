const express = require('express');
const { registerUser, loginUser, changePassword, getAllUsers } = require('../controller/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const {validation} = require('../middleware/validation-middleware');
const {registerSchema} = require('../helpers/user-validation');


const router = express.Router();

//User Register

router.post('/register', validation(registerSchema),registerUser);

//User Login
router.post('/login',loginUser);

// change password

router.post('/change',authMiddleware,changePassword);

router.get('/get',getAllUsers);




module.exports = router;