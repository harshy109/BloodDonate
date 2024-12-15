const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); // This ensures `req.body` will contain the parsed JSON data

// Enable CORS for all routes
app.use(cors()); // Place this here to allow CORS for all routes

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define routes
app.use("/api/auth", authRoutes);

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
