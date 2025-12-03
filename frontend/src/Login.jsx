import React from "react";
import { errorToast, successToast } from "./lib/toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import axiosInstance from "./axios/axiosInstance";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const { updateData } = useAuth();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const userData = {
        email: email,
        password: password,
      };

      const res = await axiosInstance.post("/api/auth/login", userData);

      if (res.status === 200) {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        updateData(res.data.token, {
          _id: res.data._id,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          companyName: res?.data?.companyName || "",
        });
        successToast("Login successful!");
        navigate("/");
      } else {
        setIsLoading(false);
        errorToast(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      errorToast(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-300 flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Username"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-between items-center w-full mb-4">
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
