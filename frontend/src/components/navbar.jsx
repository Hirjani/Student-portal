import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SearchBox from "./SearchBox";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-gray-200 sticky top-0 bg-white shadow-md z-50">
      <div className="flex items-center space-x-8">
        <Link
          to={"/"}
          className="flex items-center font-bold text-xl text-blue-500"
        >
          INTERN<span className="text-gray-700">SHALA</span>
        </Link>
        <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
          <Link
            to="/companies"
            className="hover:text-blue-500 transition-colors"
          >
            Companies
          </Link>
          <Link to="/jobs" className="hover:text-blue-500 transition-colors">
            Jobs
          </Link>
        </nav>
      </div>

      {/* Search Box - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-8">
        <SearchBox />
      </div>

      <div className="flex items-center space-x-4">
        {user?.role === "student" ? (
          <Link
            to="/student/profile"
            className=" text-blue-500 font-medium hover:underline text-nowrap"
          >
            Hi, {user.firstName} {user.lastName}
          </Link>
        ) : null}

        {user?.role === "company" ? (
          <Link
            to="/company/profile"
            className=" text-blue-500 font-medium hover:underline text-nowrap"
          >
            Hello, {user.companyName}
          </Link>
        ) : null}
        {!user ? (
          <>
            <Link to="/login">
              <button className=" text-blue-600 font-semibold border border-blue-600 rounded px-5 py-1 hover:bg-blue-50">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className=" bg-blue-500 text-white font-semibold rounded px-5 py-1 hover:bg-blue-600">
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
      </div>
    </header>
  );
}

export default Navbar;
