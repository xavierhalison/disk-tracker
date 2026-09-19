import { Router } from "express";
import {} from "../controllers/auth.controller";
import { getUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUser);

export default userRoutes;
