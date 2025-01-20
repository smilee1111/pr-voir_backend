const express= require('express');
const router = express.Router();

const userControlller = require('../controller/userController');

router.post('/create_user',userControlller.createUser);
router.get('/show_user',userControlller.getUser);


// router.put('/:id',userControlller.updateUser)
// router.delete('/:id',userControlller.deleteUser)

module.exports = router;