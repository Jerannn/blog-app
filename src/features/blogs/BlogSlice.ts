import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "./types";
import { createBlog, deleteBlog, getBlogs } from "../../services/apiBlogs";
import toast from "react-hot-toast";

interface BlogsState {
  blogs: Blog[];
  isLoading: boolean;
  isFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  error: string;
}

const initialState: BlogsState = {
  blogs: [],
  isLoading: false,
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  error: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching Blogs data
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isFetching = false;
        toast.error(action.payload as string);
      })

      // Create Blogs
      .addCase(createBlog.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isCreating = false;
        state.blogs = [...state.blogs, action.payload];
        toast.success("Blog created successfully!");
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isCreating = false;
        toast.error(action.payload as string);
      })

      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        toast.success("Blog deleted successfully!");
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error(action.payload as string);
      });
  },
});

export default blogsSlice.reducer;
