import express from "express";
import Sign_up from "../Auth/Sign_up.js";
import Sign_in from "../Auth/Sign_in.js";
import AuthMiddleware from "../../Middleware/AuthMiddleware.js";
import Logout from "../Auth/Logout.js";
import SearchUser from "../Api/SearchUser.js";
import AllUsers from "../Api/AllUsers.js";
import findUser from "../Api/User.js";
import SendMessage from "../Api/SendMessage.js";
import ReadMessage from "../Api/ReadMessage.js";

const UserRoutes = express.Router();

UserRoutes.get("/v8/user/sign_up", Sign_up);
UserRoutes.get("/v8/user/sign_in", Sign_in);
UserRoutes.get("/v8/user/logout", AuthMiddleware, Logout);
UserRoutes.get("/v8/search/user", AuthMiddleware, SearchUser);
UserRoutes.get("/v8/users", AuthMiddleware, AllUsers);
UserRoutes.get("/v8/user/by/id", findUser);
UserRoutes.post("/v8/user/chat", AuthMiddleware, SendMessage);
UserRoutes.get("/v8/user/chat/read", AuthMiddleware, ReadMessage);

export default UserRoutes;
