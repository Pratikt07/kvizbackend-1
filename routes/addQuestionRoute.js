const express = require('express');

// const addQController = require('../controllers/addQuestionController');
const addCQController = require('../controllers/addCompleteQuestionController');
const router = express.Router();
//router.post('/', addQController.addQuestion);
router.post('/', addCQController.addQuestion);

module.exports = router;
