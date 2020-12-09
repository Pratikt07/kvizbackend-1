const express = require('express');

let hello = (req, res) => {
    res.send('welcome home');
};
const router = express.Router();
router.get('/', hello);

module.exports = router;
