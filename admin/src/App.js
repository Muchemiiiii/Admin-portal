import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IconName } from "lucide-react";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import HotelManagement from "./Components/HotelManagement";
import CarRental from "./Components/CarRental";
import Payment from "./Components/Payments";  
import "./App.css";

const App = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="bd-red-200">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotelmanagement" element={<HotelManagement />} />
          <Route path="/carrental" element={<CarRental />} />
          <Route path="/payments" element={<Payments />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
