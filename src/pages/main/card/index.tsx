import { FC } from "react";
import millify from "millify";
import { Country } from "../../../types";

interface Props {
  country: Country;
}
const Card: FC<Props> = ({ country }) => {
  return (
    <div className="flex flex-col bg-White dark:bg-dark-blue shadow rounded-md overflow-hidden cursor-pointer hover:brightness-110">
      <img src={country.flag} className="object-cover w-full h-56 " />

      <div className="flex flex-col gap-3 p-4">
        <h2 className="font-bold text-xl">{country.name}</h2>
        <div>
          <p className="font-bold">
            Population:
            <span className="font-semibold text-sm ml-2">
              {millify(country.population)}
            </span>
          </p>
          <p className="font-bold">
            Region:
            <span className="font-semibold text-sm ml-2">{country.region}</span>
          </p>
          <p className="font-bold">
            Capital:
            <span className="font-semibold text-sm ml-2">
              {country.capital}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
