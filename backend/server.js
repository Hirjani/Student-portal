const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // For handling Cross-Origin Resource Sharing
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON data

app.use((req, res, next) => {
  // Middleware to log requests (optional)
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Import routes
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRouter");

// // Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/uploads", express.static("uploads"));

// Simple root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional, but good practice for centralized error handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
