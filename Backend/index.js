const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routers
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");
const reviewRouter = require("./Routes/reviewRoute");
const cartRouter = require("./Routes/cartRoute");
const addressRouter = require("./Routes/addressRoute");

// Import middleware
const errorMiddleware = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Function to connect to MongoDB and configure app
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Verify essential environment variables
    if (!process.env.FRONTEND_URL) {
      console.error("FATAL ERROR: FRONTEND_URL is not defined");
      process.exit(1);
    }

    if (!process.env.PORT) {
      console.error("FATAL ERROR: PORT is not defined");
      process.exit(1);
    }

    // Setup CORS and cookie parser
    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );
    app.use(cookieParser());

    // Setup body parsers
    app.use(express.json());

    // Setup routers
    app.use("/api/user", userRouter);
    app.use("/api/product", productRouter);
    app.use("/api/review", reviewRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/address", addressRouter);

    // Error handling middleware
    app.use(errorMiddleware);

    // Default route
    app.get("/", (req, res) => {
      res.json({ message: "Hello world" });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB...", error);
  }
};

connectDB();
