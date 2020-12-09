const express = require('express');

const loginCntr = require('../controllers/loginController');
const router = express.Router();
router.post('/', loginCntr.login);

module.exports = router;
