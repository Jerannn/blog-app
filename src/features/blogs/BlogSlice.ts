import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "./types";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../../services/apiBlogs";
import toast from "react-hot-toast";

interface BlogsState {
  blogs: Blog[];
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string;
  selectedBlog: Blog | null;
}

const initialState: BlogsState = {
  blogs: [],
  total: 0,
  page: 1,
  pageSize: 3,
  isLoading: false,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: "",
  selectedBlog: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    // fetching blog
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.blogs = action.payload.blogs;
        state.total = action.payload.total;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isFetching = false;
        toast.error(action.payload as string);
      })

      // Create blog
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

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isUpdating = false;

        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );

        if (index !== -1) {
          state.blogs[index] = action.payload;
          toast.success("Updated successfully!");
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isUpdating = false;
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

export const { nextPage, prevPage, selectBlog, clearSelectedBlog } =
  blogsSlice.actions;

export default blogsSlice.reducer;
