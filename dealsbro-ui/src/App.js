import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import './App.css';
import MapView from './map/Map';
import Swagger from "./admin/Swagger";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<Swagger />}/>
                <Route path="/" element={<MapView />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
