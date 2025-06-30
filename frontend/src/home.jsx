// src/Home.jsx
import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import CompanyList from "./components/CompanyList";

const Home = () => {
  const { user, token, loading } = useAuth();
  return (
    <div className="bg-white">
      <main className=" bg-teal-300 flex md:flex-row flex-col items-center justify-between px-10 py-16 text-white relative overflow-hidden">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Platform to <br /> <span className="text-red-500">Connect </span>{" "}
            Students & Companies
          </h1>
          <br />
          <p className="text-lg">Discover your dream internship</p>
          <br />

          {!token && !user ? (
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link to="/login">
                <button className=" bg-red-500 flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className=" bg-red-500 flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      <div>
        <CompanyList />
      </div>

      <footer className="footer">
        <div id="copyright">© Copyright 2025 Internshala</div>
        <div className="clear"></div>
      </footer>
    </div>
  );
};

export default Home;
