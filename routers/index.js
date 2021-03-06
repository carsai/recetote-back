const express = require('express');

const router = express.Router();

router.use('/categories', require('./categories'));
router.use('/ingredients', require('./ingredients'));

module.exports = router;
