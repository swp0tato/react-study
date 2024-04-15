import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout/AppLayout";
import Hompage from "./pages/Homepage/Hompage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Hompage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
