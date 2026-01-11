import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/BlogSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// supabase password
// rCwW6LxEph3AOUmq
