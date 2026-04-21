import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../../services/authServices";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true, // ✅ IMPORTANT FIX (Set to true so PrivateRoute waits for initial fetch)
  error: null,
};


// ==============================
// 🔄 FETCH CURRENT USER (on app load)
// ==============================
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUser();
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);


// ==============================
// 🔐 LOGIN
// ==============================
export const login = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    try {
      console.log("LOGIN API CALL START");

      const res = await loginUser(data);

      console.log("LOGIN SUCCESS", res.data);

      return res.data.data.user;
    } catch (err: any) {
      console.log("LOGIN ERROR", err);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// ==============================
// 📝 REGISTER
// ==============================
export const register = createAsyncThunk(
  "auth/register",
  async (data: any, thunkAPI) => {
    try {
      const res = await registerUser(data);
      return res.data.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);


// ==============================
// 🚪 LOGOUT
// ==============================
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);


// ==============================
// 🧠 SLICE
// ==============================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH USER
      // =========================
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

      // =========================
      // LOGIN
      // =========================
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =========================
      // REGISTER
      // =========================
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =========================
      // LOGOUT
      // =========================
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;