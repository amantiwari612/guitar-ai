import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVideos,
  uploadVideo,
  deleteVideo,
} from "../../services/videoServices";

interface VideoState {
  videos: any[];
  loading: boolean;
  error: string | null;
  totalVideos: number;
  currentPage: number;
  totalPages: number;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  totalVideos: 0,
  currentPage: 1,
  totalPages: 1,
};

// ==============================
// 🔄 FETCH ALL VIDEOS
// ==============================
export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (params: any = {}, thunkAPI) => {
    try {
      const res = await getAllVideos(params);
      return res.data; // The response structure from your backend
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch videos"
      );
    }
  }
);

// ==============================
// ⬆️ UPLOAD VIDEO
// ==============================
export const addVideo = createAsyncThunk(
  "video/addVideo",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await uploadVideo(data);
      return res.data.data; // assuming ApiResponse(200, video, ...) returns data in `data.data`
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to upload video"
      );
    }
  }
);

// ==============================
// 🗑️ DELETE VIDEO
// ==============================
export const removeVideo = createAsyncThunk(
  "video/removeVideo",
  async (videoId: string, thunkAPI) => {
    try {
      await deleteVideo(videoId);
      return videoId; // Return the ID to filter it out from the state
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete video"
      );
    }
  }
);

// ==============================
// 🧠 SLICE
// ==============================
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // =========================
      // FETCH VIDEOS
      // =========================
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos || [];
        state.totalVideos = action.payload.totalVideos || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =========================
      // UPLOAD VIDEO
      // =========================
      .addCase(addVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally prepend the newly uploaded video to the top of the list
        state.videos.unshift(action.payload);
        state.totalVideos += 1;
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =========================
      // DELETE VIDEO
      // =========================
      .addCase(removeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVideo.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted video by its ID
        state.videos = state.videos.filter((v) => v._id !== action.payload);
        state.totalVideos = Math.max(0, state.totalVideos - 1);
      })
      .addCase(removeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default videoSlice.reducer;
