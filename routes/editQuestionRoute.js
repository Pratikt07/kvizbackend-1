const express = require('express');

const editQController = require('../controllers/editQuestionController');
const router = express.Router();
// router.get('/', editQController.editQuestion);
router.post('/', editQController.editQuestion);

module.exports = router;
