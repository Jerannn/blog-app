import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
  modalType: "editBlog" | "deleteBlog" | "viewBlog" | null;
}

const initialState: UIState = {
  isModalOpen: false,
  modalType: null,
};

const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = UiSlice.actions;
export default UiSlice.reducer;
