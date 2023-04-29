import { configureStore } from "@reduxjs/toolkit";
import memeSlice from "../features/memeSlice";

export const store = configureStore({
  reducer: {
    meme: memeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
