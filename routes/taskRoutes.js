const express = require("express");
const router = express.Router();
const {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} = require("../controller/taskController");

router.post("/", createTaskController);
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

module.exports = router;
