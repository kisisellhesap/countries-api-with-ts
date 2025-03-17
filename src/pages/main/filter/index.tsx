import { FC } from "react";
import Input from "./input";
import Select from "./select";

const Filter: FC = () => {
  return (
    <div className="flex  justify-between items-center gap-3 max-sm:flex-col max-sm:items-start ">
      <Input />
      <Select />
    </div>
  );
};

export default Filter;
