const express = require('express');
const router = express.Router();

const createQuiz = require('../controllers/createQuizController')

router.post('/', createQuiz.createQuiz );

module.exports = router;