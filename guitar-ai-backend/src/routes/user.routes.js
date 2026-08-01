import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { addUser, deleteUser, toogleUserRestriction } from "../controllers/admin/userController.js";
import { getAllUsers } from "../controllers/authController.js";


const router = Router();

router
  .get("/users", authMiddleware, adminMiddleware, getAllUsers)
  .post("/users", authMiddleware, adminMiddleware, addUser)
  .delete("/users/:id", authMiddleware, adminMiddleware, deleteUser)
  .patch("/users/:id/restrict", authMiddleware, adminMiddleware, toogleUserRestriction)

export default router;