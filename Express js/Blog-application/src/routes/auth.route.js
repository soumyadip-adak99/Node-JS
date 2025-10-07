import { Router } from "express";
import { logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const route = Router();

route.route("/logout").post(verifyJWT, logoutUser)

export default route;