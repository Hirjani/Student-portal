import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoutes";
import StudentProfile from "./components/StudentProfile";

function App() {
  console.log("App component rendered");
  return (
    <AuthProvider>
      <ToastContainer />{" "}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route element={<ProtectedRoute role={"student"} />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
