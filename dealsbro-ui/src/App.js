import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MapView from "./map/Map";
import Swagger from "./admin/Swagger";
import Admin from "./admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/swagger" element={<Swagger />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
