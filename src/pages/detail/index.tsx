import { FC } from "react";
import { useParams } from "react-router-dom";

const Detail: FC = () => {
  const { name } = useParams();

  console.log(name);

  return <div className="container">detail</div>;
};

export default Detail;
