import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";
import Detail from "./pages/detail/Detail";
import Board from "./pages/board/Board";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:id" element={<Detail />} />
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
