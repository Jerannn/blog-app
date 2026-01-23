import { createSlice } from "@reduxjs/toolkit";
import type { Comment } from "./types";
import { addComment, getComments } from "../../services/apiComment";
import toast from "react-hot-toast";

interface CommentState {
  comments: Comment[];
  isFetching: boolean;
  isCommenting: boolean;
}

const initialState: CommentState = {
  comments: [],
  isFetching: false,
  isCommenting: false,
};

const comment = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetching comments
      .addCase(getComments.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isFetching = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isFetching = false;
        toast.error(action.payload as string);
      })

      // Add comment
      .addCase(addComment.pending, (state) => {
        state.isCommenting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isCommenting = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isCommenting = false;
        toast.error(action.payload as string);
      });
  },
});

export default comment.reducer;
