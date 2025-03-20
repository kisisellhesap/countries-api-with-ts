import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountries = createAsyncThunk("getCountry", async () => {
  const response = await axios.get<any[]>("https://restcountries.com/v3.1/all");

  const filteredData = response.data.map((country) => ({
    name: country.name.common,
    capital: country.capital ? country.capital[0] : "No Capital",
    region: country.region,
    population: country.population,
    flag: country.flags?.svg || country.flags?.png,
    cca3: country.cca3,
    borders: country.borders || [],
  }));

  return filteredData;
});

export const getByRegion = createAsyncThunk(
  "getByRegion",
  async (region: string) => {
    const response = await axios.get<any[]>(
      `https://restcountries.com/v3.1/region/${region}`
    );

    const filteredData = response.data.map((country) => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "No Capital",
      region: country.region,
      population: country.population,
      flag: country.flags?.svg || country.flags?.png,
      cca3: country.cca3,
      borders: country.borders || [],
    }));

    return filteredData;
  }
);

export const getDetail = createAsyncThunk(
  "getDetail",
  async (region: string | undefined) => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${region}`
    );

    const country = response.data[0];

    // console.log(country);
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

    // console.log(filteredData);

    return filteredData;
  }
);
