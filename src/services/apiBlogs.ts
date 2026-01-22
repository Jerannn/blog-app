import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "./supabase";
import type { Blog, CreateBlogInput } from "../features/blogs/types";
import { capitalizeFirstLetter } from "../utils/helper";

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
  image: File | null;
};

export const getBlogs = createAsyncThunk<GetBlogReturnedType, GetBlogArgs>(
  "blogs/fetch",
  async ({ page, pageSize }, { rejectWithValue }) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false })
      .range(from, to);

    if (error) return rejectWithValue("Blogs could not be loaded");

    return {
      blogs: data,
      total: count ?? 0,
    };
  },
);

export const getBlog = createAsyncThunk<Blog, string>(
  "blogs/get",
  async (id, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return rejectWithValue("Blog not found!");

    return data;
  },
);

export const createBlog = createAsyncThunk<Blog, CreateBlogInput>(
  "blogs/create",
  async (newBlog, { rejectWithValue }) => {
    const imageName = `${Math.random()}-${newBlog.image?.name}`.replaceAll(
      "/",
      "",
    );

    const imagePath = newBlog.image
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/blog-post-images/${imageName}`
      : null;

    // 1. Create blog
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title: capitalizeFirstLetter(newBlog.title),
        content: newBlog.content,
        authorName: newBlog.authorName,
        authorEmail: newBlog.authorEmail,
        user_id: newBlog.user_id,
        image: imagePath,
      })
      .select()
      .single();

    if (error) return rejectWithValue("Failed to create blog");

    if (newBlog.image) {
      // 2. Upload image
      const { error: storageError } = await supabase.storage
        .from("blog-post-images")
        .upload(imageName, newBlog.image);

      // 3. Delete the blog IF there was an error uploading image
      if (storageError) {
        await supabase.from("blogs").delete().eq("id", data.id);
      }
    }

    return data;
  },
);

export const deleteBlog = createAsyncThunk<string, string>(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    // 1. Get the blog to find its image
    const { data: blog, error } = await supabase
      .from("blogs")
      .select("image")
      .eq("id", id)
      .single();

    if (error) return rejectWithValue("Can't find this blog");

    const imagePath = blog?.image?.split("/").at(-1);

    // 2. Delete the image from storage if it exists
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from("blog-post-images")
        .remove([imagePath]);

      if (storageError)
        return rejectWithValue("Failed to delete blog image from storage");
    }

    // 3. Delete the blog from DB
    const { error: dbError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (dbError) return rejectWithValue("Failed to delete blog");

    return id;
  },
);

export const updateBlog = createAsyncThunk<Blog, UpdateBlogArgs>(
  "blogs/update",
  async ({ id, title, content, image }, { rejectWithValue }) => {
    // 1. Get the blog to find its image
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .select("image")
      .eq("id", id)
      .single();

    if (blogError) return rejectWithValue("Can't find this blog");

    let imageFullPath;

    if (image) {
      const imagePath = blog?.image?.split("/").at(-1);
      const imageName = `${Math.random()}-${image?.name}`.replaceAll("/", "");

      imageFullPath = image
        ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/blog-post-images/${imageName}`
        : null;

      // 2. Delete current image from bucket
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("blog-post-images")
          .remove([imagePath]);

        if (storageError)
          return rejectWithValue("Failed to delete blog image from storage");
      }

      // 3. Upload a new image
      await supabase.storage.from("blog-post-images").upload(imageName, image);
    }

    const { data, error } = await supabase
      .from("blogs")
      .update({ title, content, image: imageFullPath })
      .eq("id", id)
      .select()
      .single();

    if (error) return rejectWithValue(error.message);

    return data;
  },
);
