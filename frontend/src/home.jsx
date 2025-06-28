// src/Home.jsx
import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="flex items-center font-bold text-xl text-blue-500"
          >
            INTERN<span className="text-gray-700">SHALA</span>
          </a>
          <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
            <div className="relative group cursor-pointer"></div>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></line>
            </svg>
          </div>
          <Link to="/login">
            <button className="text-blue-600 font-semibold border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-500 text-white font-semibold rounded px-5 py-1 hover:bg-blue-600">
              Register
            </button>
          </Link>
          <a href="#" className="text-blue-500 font-medium hover:underline">
            For Students →
          </a>
        </div>
      </header>

      <main className="bg-internshala-blue flex md:flex-row flex-col items-center justify-between px-10 py-16 text-white relative overflow-hidden">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Platform to <span className="text-yellow-400">Connect </span>{" "}
            Students & Companies
          </h1>
          <p className="text-lg">Discover your dream internship</p>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="btn-google flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
              Log In
            </button>
            <button className="btn-email flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div id="social_media_container">
          <a
            className="social_media_link_footer"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ic-24-instagram"></i>
          </a>
          <a
            className="social_media_link_footer"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ic-24-twitter"></i>
          </a>
          <a
            className="social_media_link_footer"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ic-24-filled-youtube"></i>
          </a>
          <a
            className="social_media_link_footer"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ic-24-linkedin"></i>
          </a>
        </div>
        <div id="copyright">© Copyright 2025 Internshala</div>
        <div className="clear"></div>
      </footer>
    </div>
  );
};

export default Home;
