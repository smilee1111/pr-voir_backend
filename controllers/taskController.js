const Task = require("../model/task");


const { Op, Sequelize } = require("sequelize");
async function getTasksByDay(req, res) {
    try {
      const { dayIndex } = req.params;
      const { userId } = req.query; // Get userId from query parameters
  
      // Get today's date and calculate the start of the week (Sunday)
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the start of the week (Sunday)
  
      // Calculate the selected day based on the week (start of the week + day index)
      const selectedDate = new Date(startOfWeek);
      selectedDate.setDate(startOfWeek.getDate() + parseInt(dayIndex)); // Adjust for selected day
  
      // Fetch tasks for the selected user and date (from 00:00 to 23:59)
      const tasks = await Task.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(selectedDate.setHours(0, 0, 0, 0)), // Start of the day (midnight)
            [Op.lt]: new Date(selectedDate.setHours(23, 59, 59, 999)) // End of the day (just before midnight)
          },
          userId: userId // Filter by userId
        }
      });
  
      res.json(tasks); // Send the fetched tasks as a response
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
async function createTask(req, res) {
    try {
        const { title, description, duetime, status, priority, userId } = req.body;
        
        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const newTask = await Task.create({ title, description, duetime, status, priority, userId });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Create Task Error:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving task" });
    }
}

async function updateTask(req, res) {
    try {
        const { title, description, duetime, status, priority, userId } = req.body;
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        await task.update({ title, description, duetime, status, priority, userId });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        await task.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
}
async function getTasksByUser (req, res){
    try {
        const { userId } = req.params;
        const tasks = await Task.findAll({ where: { userId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByUser,
    getTasksByDay
};
