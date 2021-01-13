
const express = require('express');

const getCategoriesController = require('../controllers/getCategoryController');
const router = express.Router();
router.get('/', getCategoriesController.getCategory);

module.exports = router;
