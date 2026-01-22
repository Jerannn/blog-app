import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Blog } from "./types";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../../services/apiBlogs";
import toast from "react-hot-toast";

interface BlogsState {
  blogs: Blog[];
  blog: Blog | null;
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string;
}

const initialState: BlogsState = {
  blogs: [],
  blog: null,
  total: 0,
  page: 1,
  pageSize: 3,
  isLoading: false,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: "",
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
    selectBlog: (state, action: PayloadAction<Blog | null>) => {
      state.blog = action.payload;
    },
    resetState: (state) => {
      state.page = 1;
    },
    resetState: (state) => {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    // Get blogs
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

      // Get blog
      .addCase(getBlog.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isFetching = false;
        state.blog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
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
          (blog) => blog.id === action.payload.id,
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
