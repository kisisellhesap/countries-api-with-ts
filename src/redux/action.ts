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
  }));

  return filteredData;
});
