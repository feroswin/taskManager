import express from "express";
import AuthController from "../controllers/auth.controller.js";

export const router = express.Router()

router.get("/login", AuthController.login)

router.post("/register", (req, res) => {

})


