import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export const router = express.Router()

router.post("/login", AuthController.login)

router.post("/register", AuthController.register)

router.get("/me", authMiddleware, AuthController.getMe)


