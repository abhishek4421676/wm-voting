require("dotenv").config();
const app = require("../backend/src/app");
const connectDB = require("../backend/src/config/db");

// Connect to database
connectDB();

// Export the Express app as a serverless function
module.exports = app;
