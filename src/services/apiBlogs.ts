import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Blog, CreateBlogInput } from "../features/blogs/types";

type GetBlogReturnedType = {
  blogs: Blog[];
  total: number;
};

type GetBlogArgs = {
  page: number;
  pageSize: number;
};

type UpdateBlogArgs = {
  id: string | undefined;
  title: string;
  content: string;
};

export const getBlogs = createAsyncThunk<GetBlogReturnedType, GetBlogArgs>(
  "blogs/get",
  async ({ page, pageSize }, { rejectWithValue }) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .range(from, to);

    if (error) {
      return rejectWithValue("Blogs could not be loaded");
    }

    return {
      blogs: data ?? [],
      total: count ?? 0,
    };
  }
);

export const createBlog = createAsyncThunk<Blog, CreateBlogInput>(
  "blogs/create",
  async (newBlog, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title: newBlog.title,
        content: newBlog.content,
        authorName: newBlog.authorName,
        authorEmail: newBlog.authorEmail,
        user_id: newBlog.user_id,
      })
      .select()
      .single();

    if (error) {
      return rejectWithValue("Failed to create blog");
    }

    return data;
  }
);

export const deleteBlog = createAsyncThunk<string, string>(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      return rejectWithValue("Can't delete this blog");
    }

    return id;
  }
);

export const updateBlog = createAsyncThunk<Blog, UpdateBlogArgs>(
  "blogs/update",
  async ({ id, title, content }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("blogs")
      .update({ title, content })
      .eq("id", id)
      .select()
      .single();

    if (error) return rejectWithValue(error.message);

    return data;
  }
);
