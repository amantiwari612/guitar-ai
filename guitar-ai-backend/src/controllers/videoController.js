import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    throw new ApiError(400, "All fields are required")
  }

  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  if (!videoFileLocalPath) {
    throw new ApiError(400, "All files are required")
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);

  if (!videoFile) {
    throw new ApiError(400, "Video upload failed")
  }

  const video = new Video({
    videoFile: videoFile.url,
    title,
    description,
    duration: videoFile.duration,
    owner: req.user._id,
  });

  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"));

})

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findByIdAndDelete(videoId);
  if (!video) {
    throw new ApiError(400, "video not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video deleted succesfully"));
});

export {
  uploadVideo,
  deleteVideo
}