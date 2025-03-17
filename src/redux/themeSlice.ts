import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Theme {
  theme: boolean;
}

const initialState: Theme = {
  theme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = !action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
