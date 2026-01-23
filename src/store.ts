import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/BlogSlice";
import authReducer from "./features/auth/authSlice";
import uiReducer from "./features/ui/UiSlice";
import commentsReducer from "./features/comments/CommentSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    comments: commentsReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
