const express = require('express');
const router = express.Router();

const deleteQController = require('../controllers/deleteQuestionController') ;

router.delete('/',deleteQController.deleteQuestion);
module.exports = router;