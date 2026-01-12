import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "./types";
import { getBlogs } from "./blogThunks";

interface BlogsState {
  blogs: Blog[];
  isLoading: boolean;
  error: string;
}

const initialState: BlogsState = {
  blogs: [],
  isLoading: false,
  error: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching Blogs Data
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch blogs";
      });
  },
});

export default blogsSlice.reducer;
