const express = require('express');

const addQController = require('../controllers/addQuestionController');
const router = express.Router();
router.post('/', addQController.addQuestion);

module.exports = router;
