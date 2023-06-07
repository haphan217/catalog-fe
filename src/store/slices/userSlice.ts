import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, LoginForm, SignUpForm } from "utils/Types";
import { getUser, login, register } from "services/AuthService";
import { RootState } from "store/rootReducer";

export type SliceState = { isAuthenticated: boolean; loading: boolean; user: User; errorMessage: string };

const initialState: SliceState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  errorMessage: "",
};

type Error = { error_message: string }; //eslint-disable-line

export const loginUser = createAsyncThunk<User, LoginForm, { rejectValue: Error }>(
  "user/login",
  async (user: LoginForm, thunkAPI) => {
    try {
      const { data } = await login(user.email, user.password);
      localStorage.setItem("token", data.access_token);
      const res = await getUser();
      const tmpUser: User = res.data;
      localStorage.setItem("user", JSON.stringify(tmpUser));
      return tmpUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk<User, SignUpForm, { rejectValue: Error }>(
  "user/register",
  async (user: SignUpForm, thunkAPI) => {
    try {
      const { data } = await register(user.username, user.password, user.email || "");
      localStorage.setItem("token", data.access_token);
      const res = await getUser();
      const tmpUser: User = res.data;
      localStorage.setItem("user", JSON.stringify(tmpUser));
      return tmpUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return { isAuthenticated: false, user: { name: "" }, errorMessage: "", loading: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.errorMessage = "";
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.error_message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.errorMessage = "";
      state.user = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.error_message;
    });
  },
});

export const selectUser = (state: RootState) => state.userReducer;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
