import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examsData: null,
};

export const examSlice = createSlice({
  name: "examSlice",
  initialState,
  reducers: {
    setExamsData: (state, action) => {
      state.examsData = action.payload.examsData;
    },
  },
});

export const { setExamsData } = examSlice.actions;

export default examSlice.reducer;
