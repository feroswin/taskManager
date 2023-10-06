import express from "express";
import TaskController from "../controllers/task.controller.js";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export const router = express.Router()

router.get("/", authMiddleware, taskController.getTasks)
