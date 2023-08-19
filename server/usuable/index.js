const express = require('express');
const router = express.Router();


router.use('/', require('../Components/Login'));

module.exports = router;