import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCountries, getDetail } from "./action";
import { Country, CountryState, DetailCountry } from "../types";

const initialState: CountryState = {
  countries: [],
  allCountries: [],
  loading: false,
  error: undefined,
  detailCountry: null,
  rehydrated: false,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    deleteCountry: (state) => {
      state.countries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCountries.fulfilled,
      (
        state,
        action: PayloadAction<{
          allCountries: Country[];
          filteredCountries: Country[];
        }>
      ) => {
        state.countries = action.payload.filteredCountries;
        state.allCountries = action.payload.allCountries;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.countries = [];
      state.detailCountry = null;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.countries = [];
      state.detailCountry = null;
    });

    builder.addCase(
      getDetail.fulfilled,
      (state, action: PayloadAction<DetailCountry>) => {
        state.detailCountry = action.payload;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(getDetail.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.detailCountry = null;
    });
    builder.addCase(getDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.detailCountry = null;
    });

    builder.addCase("persist/REHYDRATE", (state) => {
      state.rehydrated = true;
    });
  },
});

export default countrySlice.reducer;
export const { deleteCountry } = countrySlice.actions;
