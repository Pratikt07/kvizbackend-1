const express = require('express');

const registrCntr = require('../controllers/registerController');
const router = express.Router();
router.post('/', registrCntr.register);

module.exports = router;
