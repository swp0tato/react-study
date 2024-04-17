import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";
import Detail from "./pages/detail/Detail";
import Board from "./pages/board/Board";
import Authenticate from "./pages/Authenticate/Authenticate";
import HeaderContainer from "./layout/Header/HeaderContainer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeaderContainer />}>
          <Route index element={<MainPage />} />
          <Route path="auth" element={<Authenticate />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:id" element={<Detail />} />
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
