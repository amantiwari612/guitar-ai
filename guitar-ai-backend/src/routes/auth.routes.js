import express from "express";
import { register, login, logout, refreshAccessToken, getCurrentUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Protected route
router.post("/logout", authMiddleware, logout);

// to test the auth middleware
router.get("/me", authMiddleware, getCurrentUser);

export default router;