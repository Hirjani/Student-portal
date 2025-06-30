import { useState } from "react";
import styles from "./signup.module.css";
import axiosInstance from "./axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "./lib/toast";
import { useAuth } from "./hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { updateData } = useAuth();

  // Tab state
  const [activeTab, setActiveTab] = useState("student"); // "student" or "company"

  // Student form state
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Company form state
  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleStudentChange = (field, value) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompanyChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      const currentData = activeTab === "student" ? studentData : companyData;

      if (currentData.password !== currentData.confirmPassword) {
        errorToast("Passwords do not match!");
        return;
      }

      setIsLoading(true);

      let userData;
      if (activeTab === "student") {
        userData = {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          email: studentData.email,
          password: studentData.password,
          role: "student",
        };
      } else {
        userData = {
          companyName: companyData.companyName,
          email: companyData.email,
          password: companyData.password,
          role: "company",
        };
      }

      const res = await axiosInstance.post("/api/auth/signup", userData);

      if (res.status === 201) {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);

        if (activeTab === "student") {
          updateData(res.data.token, {
            _id: res.data._id,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            role: res.data.role,
          });
        } else {
          updateData(res.data.token, {
            _id: res.data._id,
            email: res.data.email,
            companyName: res.data.companyName,
            role: res.data.role,
          });
        }

        successToast("Signup successful!");
        navigate("/");
      } else {
        setIsLoading(false);
        errorToast(res.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);
      errorToast(
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 overflow-y-auto flex justify-center items-start py-10 px-4">
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2 className={styles.h2}>Sign Up</h2>

          {/* Tab Bar */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setActiveTab("student")}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                activeTab === "company"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🏢 Company
            </button>
          </div>

          <form onSubmit={handleSignup}>
            {/* Student Form */}
            {activeTab === "student" && (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="student-first-name">First Name</label>
                  <input
                    type="text"
                    id="student-first-name"
                    placeholder="Enter your first name"
                    required
                    onChange={(e) =>
                      handleStudentChange("firstName", e.target.value)
                    }
                    value={studentData.firstName}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="student-last-name">Last Name</label>
                  <input
                    type="text"
                    id="student-last-name"
                    placeholder="Enter your last name"
                    required
                    onChange={(e) =>
                      handleStudentChange("lastName", e.target.value)
                    }
                    value={studentData.lastName}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="student-email">Email</label>
                  <input
                    type="email"
                    id="student-email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                      handleStudentChange("email", e.target.value)
                    }
                    value={studentData.email}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="student-password">Password</label>
                  <input
                    type="password"
                    id="student-password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      handleStudentChange("password", e.target.value)
                    }
                    value={studentData.password}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="student-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="student-confirm-password"
                    placeholder="Confirm your password"
                    required
                    onChange={(e) =>
                      handleStudentChange("confirmPassword", e.target.value)
                    }
                    value={studentData.confirmPassword}
                  />
                </div>
              </>
            )}

            {/* Company Form */}
            {activeTab === "company" && (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    id="company-name"
                    placeholder="Enter your company name"
                    required
                    onChange={(e) =>
                      handleCompanyChange("companyName", e.target.value)
                    }
                    value={companyData.companyName}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="company-email">Company Email</label>
                  <input
                    type="email"
                    id="company-email"
                    placeholder="Enter company email"
                    required
                    onChange={(e) =>
                      handleCompanyChange("email", e.target.value)
                    }
                    value={companyData.email}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="company-password">Password</label>
                  <input
                    type="password"
                    id="company-password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      handleCompanyChange("password", e.target.value)
                    }
                    value={companyData.password}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="company-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="company-confirm-password"
                    placeholder="Confirm your password"
                    required
                    onChange={(e) =>
                      handleCompanyChange("confirmPassword", e.target.value)
                    }
                    value={companyData.confirmPassword}
                  />
                </div>
              </>
            )}

            <button className={styles.button} disabled={isLoading}>
              {isLoading
                ? "Creating Account..."
                : `Sign Up as ${
                    activeTab === "student" ? "Student" : "Company"
                  }`}
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
