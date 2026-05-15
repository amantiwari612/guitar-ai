import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  coverImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    try {

      const res = await api.post('/auth/login', data);

      const user = res.data.data.user;

      if (user.role !== 'admin') {
        await api.post('/auth/logout');
        return thunkAPI.rejectWithValue('Unauthorized: You are not an admin.');
      }

      localStorage.setItem('isAdminLoggedIn', 'true');
      return user;
    } catch (err: any) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        return rejectWithValue('Not logged in');
      }
      const response = await api.get('/auth/me');

      if (response.data.data.role !== 'admin') {
        localStorage.removeItem('isAdminLoggedIn');
        return rejectWithValue('Not an admin');
      }
      return response.data.data;
    } catch (err) {
      localStorage.removeItem('isAdminLoggedIn');
      const error = err as any;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('isAdminLoggedIn');
      return true;
    } catch (err) {
      const error = err as any;
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isInitialized = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
