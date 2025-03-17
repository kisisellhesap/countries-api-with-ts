import { FC, MouseEvent, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getRegion } from "../../../../redux/filterSlice";
import { useSearchParams } from "react-router-dom";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
const Select: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { region } = useSelector((store: RootState) => store.filter);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClose = (e: Event) => {
      if (!(e.target as HTMLElement).closest(".close-window")) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClose);

    return () => {
      document.body.removeEventListener("click", handleClose);
    };
  }, []);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (region !== "All") {
        newParams.set("region", region.toLowerCase());
      } else {
        newParams.delete("region");
      }
      return newParams;
    });
  }, [region]);

  const handleGetRegion = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(getRegion(e.currentTarget.value));
    setIsOpen(false);
  };

  return (
    <div className="bg-White dark:bg-dark-blue min-w-[200px] max-sm:w-full relative shadow-sm">
      <button
        className="flex items-center justify-between gap-2  w-full p-3 cursor-pointer rounded-md close-window"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{region}</span>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute bg-White dark:bg-dark-blue shadow-md top-13 rounded-md overflow-hidden flex flex-col w-full z-9999 close-window">
          {regions.map((region, i) => {
            return (
              <button
                value={region}
                onClick={handleGetRegion}
                key={i}
                className="px-5 py-2 w-full text-left hover:bg-very-light-gray dark:hover:bg-very-dark-blue cursor-pointer"
              >
                {region}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
