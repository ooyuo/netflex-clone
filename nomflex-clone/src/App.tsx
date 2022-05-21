import {BrowserRouter as Switch, Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/netflex-clone" element={<Home />} />
          <Route path="/netflex-clone/tv" element={<Tv />} />
          <Route path="/netflex-clone/search" element={<Search />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;