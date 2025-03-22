import { FC, useEffect } from "react";
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Card from "./card";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/action";
import Loader from "../../components/loader";
import NotFoundCountry from "../../components/notFoundCountry";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, loading, error, rehydrated } = useSelector(
    (store: RootState) => store.countries
  );
  const { name, region } = useSelector((store: RootState) => store.filter);

  useEffect(() => {
    if (rehydrated) {
      dispatch(getCountries({ region, name }));
    }
  }, [dispatch, region, name]);

  return (
    <main className="container flex flex-col gap-5 flex-1 relative">
      <Filter />

      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {loading ? (
          <Loader />
        ) : error ? (
          error
        ) : countries.length !== 0 ? (
          countries.map((country, i) => (
            <Link to={`detail/${country.name.toLowerCase()}`} key={i}>
              <Card country={country} />
            </Link>
          ))
        ) : (
          <NotFoundCountry />
        )}
      </div>
    </main>
  );
};

export default Main;
