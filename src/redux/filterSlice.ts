import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filter {
  region: string;
  name: string;
  searchLoading: boolean;
}

const initialState: Filter = {
  region: "All",
  name: "",
  searchLoading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { getRegion, getName, setLoading } = filterSlice.actions;
