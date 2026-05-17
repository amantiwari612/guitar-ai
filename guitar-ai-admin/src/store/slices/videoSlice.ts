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
  videos: Video[];
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

export const uploadVideo = createAsyncThunk(
  'videos/uploadVideo',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data; // Assuming response has standard ApiResponse format
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to upload video');
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
        if (state.videos && state.videos.videos) {
          state.videos.videos = state.videos.videos.filter((v) => v._id !== action.payload);
          state.videos.totalVideos = state.videos.videos.length;
        }
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        if (state.videos && state.videos.videos) {
          state.videos.videos.unshift(action.payload);
          state.videos.totalVideos = state.videos.videos.length;
        }
      });
  },
});

export default videoSlice.reducer;
