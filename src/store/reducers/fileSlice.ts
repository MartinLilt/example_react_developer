import { createSlice } from "@reduxjs/toolkit";
import { IFileState } from "../../models";

const initialState: IFileState = {
  files: [],
  currentFile: [],
  isLoading: false,
  error: "",
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile(state, action: { payload: File[] }) {
      state.currentFile = action.payload;
      state.files = [...state.files, ...action.payload];
    },

    removeAllFiles(state) {
      state.currentFile = initialState.currentFile;
      state.files = initialState.files;
    },
  },
});

export const { addFile, removeAllFiles } = fileSlice.actions;
export default fileSlice.reducer;
