const express = require('express');

const addQuizController = require('../controllers/addQuizController');
const router = express.Router();
router.post('/', addQuizController.addquiz);

module.exports = router;
