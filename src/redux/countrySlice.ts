import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCountries } from "./action";

export interface country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

interface CountryState {
  countries: country[];
  filteredCountries: country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  filteredCountries: [],
  loading: true,
  error: null,
};
const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getByFilter: (state, action) => {
      let filteredData = state.countries;

      if (action.payload.region !== "All") {
        filteredData = filteredData.filter(
          (country) =>
            country.region.toLowerCase() === action.payload.region.toLowerCase()
        );
      }

      if (action.payload.name) {
        filteredData = filteredData.filter((country) =>
          country.name.toLowerCase().includes(action.payload.name.toLowerCase())
        );
      }

      state.filteredCountries = filteredData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCountries.fulfilled,
      (state, action: PayloadAction<country[]>) => {
        state.countries = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred";
    });
  },
});

export default countrySlice.reducer;
export const { getByFilter } = countrySlice.actions;
