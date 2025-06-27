import React from "react";
import Home from "./Home";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//  import "./App.css";

function App() {
  return (

     <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
       </Routes>
    </Router>

  );
}

export default App;
