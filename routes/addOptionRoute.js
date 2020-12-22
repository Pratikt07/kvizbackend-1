const express = require('express')
const router = express.Router();

const addoptionContoller = require('../controllers/addOptionController');

router.get('/', addoptionContoller.insertOption);

module.exports = router;