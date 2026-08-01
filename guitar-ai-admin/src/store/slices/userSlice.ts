import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import { create } from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isRestricted: boolean;
  createdAt: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

interface AddUserData {
  name: string;
  email: string;
  password: string;
  role?: string;
  isRestricted?: boolean;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/users');
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: AddUserData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/users", userData);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add user');
    }
  }
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/users/users/${userId}`);
      return userId
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
)

export const toggleUserRestriction = createAsyncThunk(
  "users/toggleUserRestriction", async ({ userId, isRestricted }: { userId: string, isRestricted: boolean }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/users/${userId}/restrict`, { isRestricted });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to toggle user restriction');
    }
  }
)
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // Toggle Restriction
      .addCase(toggleUserRestriction.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
