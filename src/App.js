import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import MainPage from './pages/main/MainPage';
import SearchPage from './pages/search/SearchPage';
import Detail from './pages/detail/Detail';
import Board from './pages/board/Board';
import Authenticate from './pages/Authenticate/Authenticate';
import BoardWrite from './pages/board/pages/BoardWrite/BoardWrite';
import BoardDetail from './pages/board/pages/BoardDetail/BoardDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path="auth" element={<Authenticate />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:id" element={<Detail />} />
          <Route path="board">
            <Route index element={<Board />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="detail" element={<BoardDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
