import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import InternshipCard from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//  import "./App.css";

function App() {
  console.log("App component rendered");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
