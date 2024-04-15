import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          {" "}
          {/* Header */}
          <Route index /> {/* MainPage*/}
          <Route path="search_cafes">
            {" "}
            {/* SearchPage */} <Route index />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
