import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, LoginForm } from "utils/Types";
import { login, register } from "services/AuthService";
import { RootState } from "store/rootReducer";

type SliceState = { isAuthenticated: boolean; loading: boolean; user: User; errorMessage: string };

const initialState: SliceState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  user: { name: localStorage.getItem("token") || "" },
  errorMessage: "",
};

type Error = { message: string };
export const loginUser = createAsyncThunk<string, LoginForm, { rejectValue: Error }>(
  "user/login",
  async (user: LoginForm, thunkAPI) => {
    try {
      const data = await login(user.username, user.password);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk<string, LoginForm, { rejectValue: Error }>(
  "user/register",
  async (user: LoginForm, thunkAPI) => {
    try {
      const data = await register(user.username, user.password, user.email || "");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => ({ ...state, isAuthenticated: false, user: { name: "" } }),
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = { name: payload };
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = { name: payload };
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.message;
    });
  },
});

export const selectUser = (state: RootState) => state.userReducer;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
