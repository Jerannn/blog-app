import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "./types";

interface BlogsState {
  blogs: Blog[];
}

const initialState: BlogsState = {
  blogs: [
    {
      id: "string",
      title: "string",
      content: "string",
      author_name: "string",
      author_email: "string",
      user_id: "string",
      created_at: "string",
    },
  ],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
});

export default blogsSlice.reducer;
