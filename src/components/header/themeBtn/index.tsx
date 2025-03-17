import { FC, useEffect } from "react";
import { MdOutlineNightlight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { changeTheme } from "../../../redux/themeSlice";
import { FaRegSun } from "react-icons/fa";

const ThemeBtn: FC = () => {
  const { theme } = useSelector((store: RootState) => store.theme);

  const dispatch = useDispatch<AppDispatch>();

  const changeMode = () => {
    dispatch(changeTheme(theme));
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme);
  }, [theme]);

  return (
    <button
      className="flex gap-3 items-center text-lg font-bold cursor-pointer"
      onClick={changeMode}
    >
      {theme ? <FaRegSun /> : <MdOutlineNightlight />}

      <span> {theme ? "Light Mode" : "Dark Mode"} </span>
    </button>
  );
};
export default ThemeBtn;
