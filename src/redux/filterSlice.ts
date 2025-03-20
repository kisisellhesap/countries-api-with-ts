import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filter {
  region: string;
  name: string;
  loading: boolean;
}

const initialState: Filter = {
  region: "All",
  name: "",
  loading: false,
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
      state.loading = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { getRegion, getName, setLoading } = filterSlice.actions;
