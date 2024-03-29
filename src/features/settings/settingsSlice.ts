import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isMenuOpen: false,
  },
  reducers: {
    toggle: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggle } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.settings.isMenuOpen`
export const selectIsMenuOpen = (state: RootState) => state.settings.isMenuOpen;

export default settingsSlice.reducer;
