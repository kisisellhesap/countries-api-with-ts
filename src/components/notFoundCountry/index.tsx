import { FC } from "react";
import { GrSearch } from "react-icons/gr";

const NotFoundCountry: FC = () => {
  return (
    <div className="absolute left-[50%] text-black/25 dark:text-white/25  top-[50%] translate-x-[-50%] translate-y-[-50%]  flex flex-col gap-10 justify-between items-center">
      <GrSearch className="text-[20rem] " />
      <p className="text-2xl italic">
        The country you were looking for was not found
      </p>
    </div>
  );
};

export default NotFoundCountry;
