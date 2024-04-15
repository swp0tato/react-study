import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import MainPage from './pages/main/MainPage';
import SearchPage from './pages/search/SearchPage';
import Detail from './pages/detail/Detail';
import Board from './pages/board/Board';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route element={<MainPage />}>
            <Route path="search">
              <Route index element={<SearchPage />} />
              <Route path=":id" element={<Detail />} />
            </Route>
            <Route path="board" element={<Board />} />
          </Route>
        </Route>
        <Outlet />
      </Routes>
    </div>
  );
}

export default App;
