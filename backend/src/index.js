import express from "express"
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import { app,server} from "./lib/socket.js";




const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-chat-application-rok5mcz0i-sa-ran-rajs-projects.vercel.app",
  "https://real-time-chat-application-murex.vercel.app",
  "https://orange-smoke-0fe237f00.1.azurestaticapps.net"
];

// ✅ Enable CORS
app.use(cors({
  origin: allowedOrigins,
  
  credentials: true,
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
