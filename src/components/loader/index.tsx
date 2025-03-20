import { FC } from "react";
import { TbLoaderQuarter } from "react-icons/tb";

const Loader: FC = () => {
  return (
    <TbLoaderQuarter className="animate-spin text-8xl  absolute left-[50%] top-[50%] transform translate[-50%]" />
  );
};

export default Loader;
