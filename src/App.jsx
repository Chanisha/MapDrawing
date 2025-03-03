import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./Components/MapComponent";
import Profile from "./Components/Profile";
import "ol/ol.css";

const App = () => {
  const [user, setUser] = useState({ firstName: "", mobile: "" });

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <nav className="bg-gray-900 p-4 shadow-md flex justify-center space-x-6">
          <Link to="/" className="text-lg font-semibold hover:text-blue-400 transition duration-300">
            Home
          </Link>
          <Link to="/profile" className="text-lg font-semibold hover:text-blue-400 transition duration-300">
            Profile
          </Link>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<MapComponent user={user} setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;