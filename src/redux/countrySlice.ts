import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getByRegion, getCountries, getDetail } from "./action";

export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  cca3: string;
}

export interface DetailCountry {
  flag: string;
  name: string;
  nativeName: string[];
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  tld: string[];
  currencies: string[];
  languages: string[];
  borders: string[];
}

interface CountryState {
  countries: Country[];
  allCountries: Country[];
  loading: boolean;
  error: string | undefined;
  detailCountry: DetailCountry | null;
}

const initialState: CountryState = {
  countries: [],
  allCountries: [],
  loading: true,
  error: undefined,
  detailCountry: null,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getByFilter: (state, action) => {
      console.log(action.payload);

      // Eğer arama kutusu boşsa, tüm ülkeleri geri getir
      if (!action.payload.trim()) {
        state.countries = state.allCountries;
        return;
      }
      if (!action.payload.trim()) {
        state.countries = state.allCountries;
        return;
      }

      // Küçük harfe çevirerek filtreleme yap
      state.countries = state.allCountries.filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    deleteCountry: (state) => {
      state.countries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCountries.fulfilled,
      (state, action: PayloadAction<Country[]>) => {
        state.countries = action.payload;
        state.allCountries = action.payload;

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
      getByRegion.fulfilled,
      (state, action: PayloadAction<Country[]>) => {
        state.countries = action.payload;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(getByRegion.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.countries = [];
      state.detailCountry = null;
    });
    builder.addCase(getByRegion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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
  },
});

export default countrySlice.reducer;
export const { getByFilter, deleteCountry } = countrySlice.actions;
