import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-2 border-gray-200">
      <div className="flex items-center space-x-8">
        <Link
          to={"/"}
          className="flex items-center font-bold text-xl text-blue-500"
        >
          INTERN<span className="text-gray-700">SHALA</span>
        </Link>
        <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
          <div className="relative group cursor-pointer"></div>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="header-search border border-gray-300 rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <svg
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
            </svg> */}
        </div>
        {!user ? (
          <>
            <Link to="./Login">
              <button className="header-login text-blue-600 font-semibold border border-blue-600 rounded px-4 py-1 hover:bg-blue-50">
                Login
              </button>
            </Link>
            <Link to="./signup">
              <button className="header-signup bg-blue-500 text-white font-semibold rounded px-5 py-1 hover:bg-blue-600">
                Register
              </button>
            </Link>
          </>
        ) : (
          <button
            className="header-signup bg-blue-500 text-white font-semibold rounded px-5 py-1 hover:bg-blue-600"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}

        {user?.role === "student" ? (
          <Link
            to="/student/profile"
            className="header-for-students text-blue-500 font-medium hover:underline text-nowrap"
          >
            For Students →
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
