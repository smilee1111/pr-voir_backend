const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/createTask", taskController.createTask);
router.get("/getAllTask", taskController.getAllTasks);
router.get("/getTaskById/:id", taskController.getTaskById);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/deleteTask/:id", taskController.deleteTask);
router.get("/getTasksByUser/:userId", taskController.getTasksByUser);


module.exports = router;
