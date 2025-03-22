import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getDetail } from "../../redux/action";
import { LuArrowLeft } from "react-icons/lu";
import millify from "millify";
import Loader from "../../components/loader";
import { deleteCountry } from "../../redux/countrySlice";

const Detail: FC = () => {
  const { name } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { allCountries, detailCountry, loading, error } = useSelector(
    (store: RootState) => store.countries
  );

  useEffect(() => {
    dispatch(getDetail(name));
  }, [dispatch, name]);

  return (
    <div className="container flex flex-col gap-20">
      <Link
        to="/countries"
        className="flex items-center gap-2 shadow w-fit dark:bg-dark-blue bg-White py-2 px-8 hover:brightness-110 mt-5"
        onClick={() => dispatch(deleteCountry())}
      >
        <LuArrowLeft className="text-2xl" /> Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        error
      ) : (
        detailCountry && (
          <div className="flex justify-between gap-10 max-md:flex-col">
            <img
              src={detailCountry.flag}
              className=" w-[50%] max-w-[610px] h-[400px] max-h-[400px] shadow rounded-md 
             object-cover max-md:w-full max-lg:w-[50%] max-md:max-w-[none] max-sm:h-[300px]"
            />

            <div className="flex flex-col gap-10 w-[45%] max-md:w-[100%]">
              <h2 className="font-bold text-4xl">{detailCountry.name}</h2>
              <div className=" grid grid-cols-2 max-lg:grid-cols-1 gap-x-10 gap-y-3 justify-between ">
                <div className="flex flex-col gap-2">
                  <div className="font-bold">
                    <span>Native Name : </span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.nativeName[0]}
                    </span>
                  </div>
                  <div className="font-bold">
                    <span>Population :</span>
                    <span className="font-semibold text-sm ml-2">
                      {millify(detailCountry.population)}
                    </span>
                  </div>

                  <div className="font-bold">
                    <span>Region :</span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.region}
                    </span>
                  </div>

                  <div className="font-bold">
                    <span>Sub Region :</span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.subRegion}
                    </span>
                  </div>
                  <div className="font-bold">
                    <span>Capital :</span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.capital}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold">
                    <span>Top Level Domain : </span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.tld}
                    </span>
                  </div>

                  <div className="font-bold">
                    <span>Currencies :</span>
                    <span className="font-semibold text-sm ml-2">
                      {detailCountry.currencies[0]}
                    </span>
                  </div>

                  <div className="font-bold flex gap-2 items-end ">
                    <span className="whitespace-nowrap">Languages :</span>
                    <div className="flex flex-wrap">
                      {detailCountry.languages.map((language, i) => (
                        <span key={i} className="font-semibold text-sm ml-2">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {detailCountry.borders.length !== 0 && (
                <div className="flex gap-3 flex-wrap w-[100%] mt-auto">
                  <span className="whitespace-nowrap font-bold">
                    Border Countries :
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {detailCountry.borders.map((border, i) => {
                      const matchingCountry = allCountries.find(
                        (country) =>
                          country.cca3.toLowerCase() === border.toLowerCase()
                      );

                      return matchingCountry ? (
                        <Link
                          key={i}
                          to={`/countries/detail/${matchingCountry.name.toLowerCase()}`}
                          className="flex items-center gap-2 rounded-md w-fit bg-White dark:bg-dark-blue py-2 px-8 hover:brightness-110 shadow"
                        >
                          {matchingCountry.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
