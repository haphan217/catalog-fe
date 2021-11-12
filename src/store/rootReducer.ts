import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "store/slices/userSlice";

const rootReducer = combineReducers({
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
