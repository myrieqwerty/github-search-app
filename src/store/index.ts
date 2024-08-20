import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./slices/repo";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    repos: repoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()