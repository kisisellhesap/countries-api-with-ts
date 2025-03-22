import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filter {
  region: string;
  name: string;
}

const initialState: Filter = {
  region: "All",
  name: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    getRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    getName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { getRegion, getName } = filterSlice.actions;
