import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "store/rootReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
