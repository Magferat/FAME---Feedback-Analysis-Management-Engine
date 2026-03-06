import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "./config/db";
import feedbackRoutes from "./routes/feedbackRoutes";
import configRoutes from "./routes/config";

const app = express();

app.use(cors());
app.use(express.json());


connectDB();

app.use("/api/feedback", feedbackRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/config", configRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, environment: ${process.env.NODE_ENV}`);
});