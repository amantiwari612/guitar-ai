import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

interface Video {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  createdAt: string;
}

interface VideoResponse {
  data: Video[];
  totalVideos: number;
  [key: string]: any;
}

interface VideoState {
  videos: VideoResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: null,
  isLoading: false,
  error: null,
};

export const getAllVideos = createAsyncThunk(
  'video/getAllVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/video');
      console.log("all videos", response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'videos/deleteVideo',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/video/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete video');
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        if (state.videos && state.videos.data) {
          state.videos.data = state.videos.data.filter((v) => v._id !== action.payload);
          state.videos.totalVideos = state.videos.data.length;
        }
      });
  },
});

export default videoSlice.reducer;
