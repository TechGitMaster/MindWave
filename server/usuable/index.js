const express = require('express');
const router = express.Router();


router.use('/', require('../Components/Login'));
router.use('/', require('../Components/chatCompress'));
router.use('/', require('../Components/imageCompress'));


module.exports = router;