import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Detail from "./pages/detail";
import Header from "./components/header";

const App = () => {
  // const store = useSelector((store: RootState) => store.countries);

  // const dispatch = useDispatch<AppDispatch>();

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/countries" />} />
        <Route path="/countries" element={<Main />} />
        <Route path="countries/detail/:name" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
