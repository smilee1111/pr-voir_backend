const express= require('express');
const router = express.Router();

const userControlller = require('../controller/userController');

router.post('/create_user',userControlller.createUser);
router.get('/show_test',userControlller.getUser);
module.exports = router;