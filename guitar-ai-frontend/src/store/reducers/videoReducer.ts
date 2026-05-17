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
  },
});

export default videoSlice.reducer;
