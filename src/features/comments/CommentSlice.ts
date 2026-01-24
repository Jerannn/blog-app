import { createSlice } from "@reduxjs/toolkit";
import type { Comment } from "./types";
import {
  addComment,
  // deleteComment,
  getComments,
  updateComment,
} from "../../services/apiComment";
import toast from "react-hot-toast";

interface CommentState {
  comments: Comment[];
  comment: Comment | null;
  isFetching: boolean;
  isCommenting: boolean;
  isDeleting: boolean;
  updatingCommentId: string | null;
}

const initialState: CommentState = {
  comments: [],
  comment: null,
  isFetching: false,
  isCommenting: false,
  isDeleting: false,
  updatingCommentId: null,
};

const comment = createSlice({
  name: "comments",
  initialState,
  reducers: {
    selectComment: (state, action) => {
      state.comment = action.payload;
      console.log(state.comment);
    },
    clearSelectedComment: (state) => {
      state.comment = null;
    },
  },
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
      })

      // Update comment
      .addCase(updateComment.pending, (state, action) => {
        state.updatingCommentId = action.meta.arg.id;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.updatingCommentId = null;
        state.comments = state.comments.map((c) =>
          c.id === action.payload.id
            ? {
                ...c,
                content: action.payload.content,
                image: action.payload.image,
              }
            : c,
        );
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.updatingCommentId = null;
        toast.error(action.payload as string);
      });

    // Delete comment
    // .addCase(deleteComment.pending, (state) => {
    //   state.isDeleting = true;
    // })
    // .addCase(deleteComment.fulfilled, (state, action) => {
    //   state.isDeleting = false;
    // })
    // .addCase(deleteComment.rejected, (state, action) => {
    //   state.isDeleting = false;
    //   toast.error(action.payload as string);
    // });
  },
});

export const { selectComment, clearSelectedComment } = comment.actions;

export default comment.reducer;
