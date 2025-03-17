import { FC, useEffect } from "react";
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Card from "./card";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/action";
import { TbLoaderQuarter } from "react-icons/tb";
import { getByFilter } from "../../redux/countrySlice";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredCountries, loading, error } = useSelector(
    (store: RootState) => store.countries
  );
  const { name, region } = useSelector((store: RootState) => store.filter);

  useEffect(() => {
    if (filteredCountries.length === 0) {
      dispatch(getCountries());
    }
  }, [dispatch, filteredCountries.length]);

  useEffect(() => {
    dispatch(getByFilter({ region, name }));
  }, [dispatch, region, name]);

  return (
    <main className="container flex flex-col gap-5 flex-1 relative">
      <Filter />

      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {loading ? (
          <TbLoaderQuarter className="animate-spin text-8xl  absolute left-[50%] top-[50%] transform translate[-50%]" />
        ) : error ? (
          error
        ) : filteredCountries.length !== 0 ? (
          filteredCountries.map((country, i) => (
            <Link to={`detail/${country.name.toLowerCase()}`} key={i}>
              <Card country={country} />
            </Link>
          ))
        ) : (
          "Ülke bulunamadı"
        )}
      </div>
    </main>
  );
};

export default Main;
