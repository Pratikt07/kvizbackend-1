const express = require('express');

const resetPasswordMailCntr = require('../controllers/resetPasswordMailController');
const router = express.Router();
router.post('/', resetPasswordMailCntr.resetMail);
router.get('/:id/:token', resetPasswordMailCntr.verifyResetPassword);

module.exports = router;
