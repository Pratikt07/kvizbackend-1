
const express = require('express');

const getQuestionController = require('../controllers/getQuestionsController');
const router = express.Router();
router.get('/', getQuestionController.getQuestions);

module.exports = router;
