// src/Home.jsx
import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const Home = () => {
  const { user, token, loading } = useAuth();
  return (
    <div className="bg-white">
      <main className="bg-internshala-blue flex md:flex-row flex-col items-center justify-between px-10 py-16 text-white relative overflow-hidden">
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Platform to <br /> <span className="text-yellow-400">Connect </span>{" "}
            Students & Companies
          </h1>
          <br />
          <p className="text-lg">Discover your dream internship</p>
          <br />

          {!token && !user ? (
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link to="./Login">
                <button className="btn-google flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
                  Log In
                </button>
              </Link>
              <Link to="./signup">
                <button className="btn-email flex items-center justify-center rounded-md px-6 py-3 shadow-md hover:shadow-lg transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="footer">
        {/* <div id="social_media_container">
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
        </div> */}
        <div id="copyright">© Copyright 2025 Internshala</div>
        <div className="clear"></div>
      </footer>
    </div>
  );
};

export default Home;
