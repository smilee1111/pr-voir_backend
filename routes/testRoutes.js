const express= require('express');
const router = express.Router();

const testControlller = require('../controller/testController');

router.post('/create_test',testControlller.createTest);
router.get('/show_test',testControlller.getTest);
module.exports = router;