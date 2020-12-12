const express = require('express');

const googleAuthcntr = require('../controllers/googleAuthController');
const router = express.Router();
router.get('/', googleAuthcntr.recievefromGoogle);

module.exports = router;
