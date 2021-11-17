import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, LoginForm, SignupForm } from "utils/Types";
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
      console.log("ERROR LOGIN", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: { name: "" } };
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
      state.user = { name: payload };
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
