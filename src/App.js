import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/pages/home";
import Favorites from "./components/pages/favorites";
import Details from "./components/pages/details";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recipe-item/:id" element={<Details />} />
          </Routes>
      </div>

    </div>
  );
}

export default App;
