const express = require('express');

let updatePasswordCntr = require('../controllers/updatePasswordController');
const router = express.Router();
router.post('/', updatePasswordCntr.updatePassword);

module.exports = router;
