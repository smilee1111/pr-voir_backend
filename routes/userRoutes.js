// const express= require('express');
// const router = express.Router();

// const userControlller = require('../controller/userController');

// router.post('/create_user',userControlller.createUser);
// router.get('/show_user',userControlller.getUser);


// // router.put('/:id',userControlller.updateUser)
// // router.delete('/:id',userControlller.deleteUser)

// module.exports = router;
const express = require("express");
const { registerUser } = require("../controller/userController");
const { loginUser } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;