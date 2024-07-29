import { createSlice } from "@reduxjs/toolkit";

const tableSlices = createSlice({
  name: "table",
  initialState: null,
  reducers: {
    setTable: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { setTable } = tableSlices.actions;

export default tableSlices.reducer;
