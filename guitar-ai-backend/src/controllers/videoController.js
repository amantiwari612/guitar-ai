import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

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

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const sortByField = ["createdAt", "duration", "views"];
  const sortTypeArr = ["asc", "desc"];
  const validSortBy = sortByField.includes(sortBy) ? sortBy : "createdAt";
  const validSortType = sortTypeArr.includes(sortType) ? sortType : "desc";

  if (userId && !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  try {
    let queryString = query ? query.toString() : "";
    let filterCondition = {
      $or: [
        {
          title: { $regex: queryString, $options: "i" },
        },
        {
          description: { $regex: queryString, $options: "i" },
        },
      ],
    };

    const videos = await Video.aggregate([
      {
        $match: {
          ...(userId ? { owner: new mongoose.Types.ObjectId(userId) } : {}),
          ...filterCondition,
        },
      },
      {
        $sort: {
          [validSortBy]: validSortType === "desc" ? -1 : 1,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit, 10) },
      {
        $project: {
          title: 1,
          description: 1,
          views: 1,
          createdAt: 1,
          duration: 1,
          owner: 1,
        },
      },
    ]);

    const totalVideos = await Video.countDocuments(filterCondition);
    // alternate for total videos
    // const totalVideos = await videos.length();
    res.status(200).json({
      limit,
      success: true,
      totalVideos,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalVideos / limit),
      videos,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while fetching the videos!");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId && !mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid  video Id");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: { $in: [req.user?._id, "$likes.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        owner: 1,
        createdAt: 1,
        likesCount: 1,
        isLiked: 1,
      },
    },
  ]);
  if (!video.length) {
    throw new ApiError(404, "Video does not exists");
  }
  await Video.findByIdAndUpdate(videoId, {
    $inc: {
      views: 1,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        video[0],
        "user fetched succesfully with the following id"
      )
    );
});

export {
  uploadVideo,
  deleteVideo,
  getAllVideos,
  getVideoById
}