const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware=require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/GetUsers", userController.getUser);
// router.get("/GetUsersById/:id", userController.getUserById);
router.put("/UpdateUsers/:id", userController.updateUser);
router.delete("/DeleteUsers/:id", userController.deleteUser);

module.exports = router;
