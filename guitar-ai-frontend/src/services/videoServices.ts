import { API } from "./api";

// Fetch all videos (supports pagination, search, etc.)
export const getAllVideos = (params?: {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortType?: string;
  userId?: string;
}) => {
  return API.get("/video", { params });
};

// Fetch a single video by ID (increments views, gets likes)
export const getVideoById = (videoId: string) => {
  return API.get(`/video/${videoId}`);
};

// Upload a new video
export const uploadVideo = (data: FormData) => {
  return API.post("/video", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete a video
export const deleteVideo = (videoId: string) => {
  return API.delete(`/video/${videoId}`);
};
