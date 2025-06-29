import { useState } from "react";
import styles from "./signup.module.css";
import axiosInstance from "./axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "./lib/toast";
import { useAuth } from "./hooks/useAuth";
const Signup = () => {
  const navigate = useNavigate();
  const [First_name, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLodging, setIsLoading] = useState(false);

  const { updateData } = useAuth();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      setIsLoading(true);
      const userData = {
        firstName: First_name,
        lastName: Last_name,
        email: email,
        password: password,
        role: "student",
      };

      const res = await axiosInstance.post("/api/auth/signup", userData);

      if (res.status === 201) {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        updateData(res.data.token, {
          _id: res.data._id,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
        });
        successToast("Signup successful!");
        navigate("/");
      } else {
        setIsLoading(false);
        errorToast(res.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 overflow-y-auto flex justify-center items-start py-10 px-4">
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2 className={styles.h2}>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={First_name}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={Last_name}
              />
            </div>
            {/* <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="resume">Resume</label>
              <input
                type="file"
                id="resume"
                required
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                required
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                required
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                placeholder="Enter your branch"
                required
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="roll">Internship Roll</label>
              <input
                type="text"
                id="roll"
                placeholder="Enter your internship roll"
                required
                onChange={(e) => setRoll(e.target.value)}
                value={roll}
              />
            </div> */}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles.inputGroup}>
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
            <div className={styles.inputGroup}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button className={styles.button} disabled={isLodging}>
              {isLodging ? "Loading..." : "Sign Up"}
            </button>
            <p className={styles.loginLink}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
