import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller.js";
import { findLoggedUser, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, findLoggedUser, getUserDetails);

export default router;