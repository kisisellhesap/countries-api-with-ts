import { FC } from "react";
import { country } from "../../../redux/countrySlice";
import { useParams } from "react-router-dom";
import millify from "millify";

interface Props {
  country: country;
}
const Card: FC<Props> = ({ country }) => {
  return (
    <div className="flex flex-col bg-White dark:bg-dark-blue shadow-lg rounded-md overflow-hidden cursor-pointer hover:brightness-110">
      <div className="bg-red-400 h-50">
        <img src={country.flag} className="object-cover w-[100%] h-[100%]" />
      </div>

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
