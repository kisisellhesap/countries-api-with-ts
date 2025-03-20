import { ChangeEvent, FC, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getName } from "../../../../redux/filterSlice";
import { useSearchParams } from "react-router-dom";
const Input: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { name } = useSelector((store: RootState) => store.filter);

  const [, setSearchParams] = useSearchParams();

  const handleGetName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getName(e.target.value));
  };

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (name !== "") {
        newParams.set("name", name.toLowerCase());
      } else {
        newParams.delete("name");
      }
      return newParams;
    });
  }, [name]);

  return (
    <div className="flex bg-White dark:bg-dark-blue shadow-sm rounded-md w-[40%] min-w-[270px] max-sm:w-full">
      <button className="text-2xl  p-3">
        <IoIosSearch />
      </button>

      <input
        type="search"
        placeholder="Search for a country.."
        className="w-full outline-none border-none pr-4"
        onChange={handleGetName}
        value={name}
      />
    </div>
  );
};

export default Input;
