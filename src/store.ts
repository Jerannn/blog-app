import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/BlogSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// supabase password
// rCwW6LxEph3AOUmq
