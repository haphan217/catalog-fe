import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, LoginForm, SignupForm } from "utils/Types";
import { login, register } from "services/AuthService";
import { RootState } from "store/rootReducer";

export type SliceState = { isAuthenticated: boolean; loading: boolean; user: User; errorMessage: string };

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
      const { data } = await login(user.username, user.password);
      localStorage.setItem("token", data.access_token);
      return user.username;
    } catch (error: any) {
      console.log("ERROR LOGIN", error);
      return thunkAPI.rejectWithValue(error as Error);
    }
  },
);

export const registerUser = createAsyncThunk<string, SignupForm, { rejectValue: Error }>(
  "user/register",
  async (user: SignupForm, thunkAPI) => {
    try {
      const { data } = await register(user.username, user.password, user.email || "");
      localStorage.setItem("token", data.access_token);
      return user.username;
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
      state.errorMessage = "";
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
      state.errorMessage = "";
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
