import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    openingSidebar(state) {
      state.isOpen = true;
    },
    closingSidebar(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openingSidebar, closingSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
