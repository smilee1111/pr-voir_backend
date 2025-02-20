const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
  } = require("../model/task");
  
  /**
   * Controller for creating a new task.
   */
// controller/taskController.js
const createTaskController = async (req, res) => {
  try {
    const { title, description, dueTime, priority, status } = req.body;

    // Validate required fields
    if (!title || !dueTime || !priority || !status) {
      return res.status(400).json({
        message: "Title, DueTime, Priority, and Status are required",
      });
    }

    // Create new task in database with the given details
    const newTask = await createTask({ title, description, dueTime, priority, status });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  /**
   * Controller for fetching all tasks.
   */
  const getAllTasksController = async (req, res) => {
    try {
      const tasks = await getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  /**
   * Controller for fetching a single task by ID.
   */
  const getTaskByIdController = async (req, res) => {
    try {
      const taskId = parseInt(req.params.id, 10);
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
  
      const task = await getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  /**
   * Controller for updating an existing task by ID.
   */
  const updateTaskController = async (req, res) => {
    try {
      
      const taskId = parseInt(req.params.id, 10);
      console.log("Updating Task with ID:", taskId); // Log task ID to verify it's being passed correctly
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
  
      const { title, description, dueTime, status, priority } = req.body;
      const updatedTask = await updateTask(taskId, {
        title,
        description,
        dueTime,
        status,
        priority,
      });
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  /**
   * Controller for deleting a task by ID.
   */
  const deleteTaskController = async (req, res) => {
    try {
      const taskId = parseInt(req.params.id, 10);
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
  
      const result = await deleteTask(taskId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Export all controllers for use in your routes
  module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController,
  };
  