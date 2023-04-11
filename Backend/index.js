import express from "express";
import ConnectDb from "./utils/DbConfig.js";
import { config } from "dotenv";
import UserRoutes from "./User/Routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import AuthMiddleware from "./Middleware/AuthMiddleware.js";
import { createServer } from "http";
import io from "./Sockets/socket.js";
import cors from "cors";
import jwt from "jsonwebtoken";

// create Server
const app = express();
const httpServer = createServer(app);

// web socket configuration
io.attach(httpServer);
io.use((socket, next) => {
  try {
    const authtoken = socket.handshake.query.token;
    if (!authtoken) {
      return next(new Error("you are unauthorised."));
    }
    // jwt verify option
    const jwt_options = {
      expiresIn: "7d",
      algorithm: "HS256",
    };

    const decode_token = jwt.verify(
      authtoken,
      process.env.JWT_SECRET,
      jwt_options
    );
    if (!decode_token) return next(new Error("Invalid auth token."));
    socket.user = decode_token;
    next();
  } catch (error) {
    console.error(error.message);
    if (error) return socket.emit("auth_error", { message: error.message });
  }
});

// configuration for server
config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// user routes
app.use(UserRoutes);
app.get("/hello", AuthMiddleware, (req, res) => {
  res.status(200).json({ data: "Hello Mom", username: req.username });
});

// connecting database and listening server after database connection
ConnectDb().then(() => {
  httpServer.listen(process.env.PORT, (error) => {
    if (error) return error;
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
