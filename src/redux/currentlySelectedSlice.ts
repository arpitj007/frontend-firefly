import { createSlice } from "@reduxjs/toolkit";

interface Base {
  name: string;
  url: string;
}

interface CurrentlySelectedState {
  data: Base | null;
  error: string | null;
}

const initialState: CurrentlySelectedState = {
  data: null,
  error: null,
};

const currentlySelectedSlice = createSlice({
  name: "currentlySelected",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.data = null;
      state.error = null;
    },
    add: (state, action) => {
      // add works similar to update since we have implementned checks around data change
      state.data = action.payload;
      state.error = null;
    },
  },
});

export const { clearSelected, add } = currentlySelectedSlice.actions;

export default currentlySelectedSlice.reducer;
