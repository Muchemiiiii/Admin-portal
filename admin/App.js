import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import HotelManagement from "./Components/HotelManagement";
import CarRental from "./src/Components/CarRental";
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
            <Route path="/hotel-management" element={<HotelManagement />} />
            <Route path="/car-rental" element={<CarRental />} />
           

           
  /
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </div>
    );
  };
  
  export default App;
  