import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoutes";
import StudentProfile from "./components/StudentProfile";
import Navbar from "./components/navbar";
import CompanyProfile from "./components/CompanyProfile";
import CompanyProfileDisplay from "./components/CompanyProfileDisplay";
import SearchResults from "./components/SearchResults";

function App() {
  console.log("App component rendered");
  return (
    <>
      <ToastContainer />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute role={"student"} />}>
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>
          <Route element={<ProtectedRoute role={"company"} />}>
            <Route path="/company/profile" element={<CompanyProfile />} />
          </Route>
          <Route path="/company/details" element={<CompanyProfileDisplay />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/companies" element={<SearchResults />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
