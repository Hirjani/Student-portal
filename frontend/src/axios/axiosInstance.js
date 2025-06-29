import axios from "axios";

const baseURL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export default axiosInstance;
