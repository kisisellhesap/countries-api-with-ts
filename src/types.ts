export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  cca3: string;
  borders: string[];
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

export interface CountryState {
  countries: Country[];
  allCountries: Country[];
  loading: boolean;
  error: string | undefined;
  detailCountry: DetailCountry | null;
  rehydrated: boolean;
}

export interface GetCountriesArgs {
  region: string;
  name: string;
}
