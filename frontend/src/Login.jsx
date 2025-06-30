import React from "react";
import styles from "./Login.module.css";
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
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen bg-blue-300 flex justify-center items-center">
      <div className={styles["login-container"]}>
        <div className={styles["login-box"]}>
          <h2 className={styles.h2}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles["input-group"]}>
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Username"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
            <p className={styles["signup-link"]}>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
