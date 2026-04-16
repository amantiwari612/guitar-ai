import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../../services/authServices.js"

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await getCurrentUser();
    return res.data.data.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 🔐 login
export const login = createAsyncThunk("auth/login", async (data: any, thunkAPI) => {
  try {
    const res = await loginUser(data);
    return res.data.data.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 🔐 register
export const register = createAsyncThunk("auth/register", async (data: any, thunkAPI) => {
  try {
    const res = await registerUser(data);
    console.log(res.data);
    return res.data.data.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 🚪 logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // login/register success
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;