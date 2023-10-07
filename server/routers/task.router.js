import express from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export const router = express.Router()

router.get("/", authMiddleware, taskController.getTasks)
router.post("/add-task", authMiddleware, taskController.createTask)
router.delete("/delete-task/:id", authMiddleware, taskController.deleteTask)
router.put("/update-task/:id", authMiddleware, taskController.editTask)
