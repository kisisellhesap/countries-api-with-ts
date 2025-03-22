import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetCountriesArgs } from "../types";

export const getCountries = createAsyncThunk(
  "getCountry",
  async (arg: GetCountriesArgs) => {
    const url =
      arg.region === "All"
        ? "https://restcountries.com/v3.1/all"
        : `https://restcountries.com/v3.1/region/${arg.region}`;

    const response = await axios.get<any[]>(url);

    const data = response.data.map((country) => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "No Capital",
      region: country.region,
      population: country.population,
      flag: country.flags?.svg || country.flags?.png,
      cca3: country.cca3,
      borders: country.borders || [],
    }));

    const filteredData = arg.name
      ? data.filter((country) =>
          country.name.toLowerCase().includes(arg.name.toLowerCase())
        )
      : data;

    return { allCountries: data, filteredCountries: filteredData };
  }
);

export const getDetail = createAsyncThunk(
  "getDetail",
  async (region: string | undefined) => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${region}`
    );

    const country = response.data[0];

    const filteredData = {
      flag: country.flags?.svg || country.flags?.png,

      name: country.name.common,
      nativeName: Object.values(country.name.nativeName || {}).map(
        (native: any) => native.official
      ),
      subRegion: country.subregion || "There is no feature in this country",
      tld: country.tld || [],
      currencies: Object.values(country.currencies || {}).map(
        (cur: any) => cur.name
      ),
      languages: Object.values(country.languages || []) as string[],
      borders: country.borders || [],
      capital: country.capital?.[0] || "Unknown",
      region: country.region,
      population: country.population,
      cca3: country.cca3,
    };

    return filteredData;
  }
);
