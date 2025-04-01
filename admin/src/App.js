import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";

const App = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

   
     
    return (
      <div className="mx-auto bd-red-200">
        <Router>
          <Sidebar /> {/* Sidebar  is always visible */}
          <Routes>
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/Login" element={<Login />} />
           
  
            {/* Add more routes as needed */}
          </Routes>
          {/* Footer Section */}
          <Footer />
        </Router>
      </div>
    );
  };
  
  export default App;
  