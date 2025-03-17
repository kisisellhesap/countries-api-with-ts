import { FC } from "react";
import ThemeBtn from "./themeBtn";

const Header: FC = () => {
  return (
    <header className=" bg-White dark:bg-dark-blue shadow-md">
      <div className="container flex justify-between item-center gap-3 ">
        <h1 className="text-3xl max-md:text-2xl font-extrabold">
          Where in the world ?
        </h1>
        <ThemeBtn />
      </div>
    </header>
  );
};

export default Header;
