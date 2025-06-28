import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    
    const userData = {
      email: email, 
      password: password,
    };
  };

  // You can send userData to your backend for authentication
  return (
    <div className="h-screen bg-blue-300 flex justify-center items-center">
      <div className={styles["login-container"]}>
        <div className={styles["login-box"]}>
          <h2 className={styles.h2}>Login</h2>
          <form>
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
            <button className={styles.button} type="submit">
              Login
            </button>
            <p className={styles["signup-link"]}>
              Don't have an account? <a href="/sign-up">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
