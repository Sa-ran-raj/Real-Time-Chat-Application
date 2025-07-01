import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import { app,server,io } from "./lib/socket.js";




const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://real-time-chat-application-rok5mcz0i-sa-ran-rajs-projects.vercel.app" // Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true, // VERY important for cookies
}));
dotenv.config();

app.use(cookieParser());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

server.listen(5001,()=>{
    console.log("server running on port 5001");
    connectDB();
});    