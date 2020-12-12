const express = require('express');

let verifyRegisterUserCntr = require('../controllers/verifyRegUserController');
const router = express.Router();
router.get('/', verifyRegisterUserCntr.verifyRegisterUser);

module.exports = router;
