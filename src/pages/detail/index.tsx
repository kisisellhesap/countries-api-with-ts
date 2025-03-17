import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail: FC = () => {
  const { name } = useParams();

  return <div className="container">detail</div>;
};

export default Detail;
