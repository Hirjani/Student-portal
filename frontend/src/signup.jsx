import React from "react";
import styles from "./signup.module.css";

const Signup = () => {
  const [First_name, setFirstName] = React.useState("");
  const [Last_name, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [city, setCity] = React.useState("");
  const [resume, setResume] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [roll, setRoll] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      First_name,
      Last_name,
      username,
      email,
      city,
      resume,
      gender,
      dob,
      branch,
      roll,
      password,
    };
    console.log("User Data:", userData);
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
            <div className={styles.inputGroup}>
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
            </div>
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
            <button className={styles.button} type="submit">
              Sign Up
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