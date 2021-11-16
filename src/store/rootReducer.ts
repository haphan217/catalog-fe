import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "store/slices/userSlice";
import modalReducer from "store/slices/modalSlice";

const rootReducer = combineReducers({
  userReducer,
  modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
