import { Router } from "express";
import { deleteVideo, getAllVideos, getVideoById, uploadVideo } from "../controllers/videoController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();
router.use(authMiddleware);
router
  .route("/")
  .get(getAllVideos)
  .post(upload.fields([{ name: "videoFile", maxCount: 1 }]), uploadVideo);


router
  .route("/:videoId")
  .get(getVideoById)
  .delete(deleteVideo);

export default router;