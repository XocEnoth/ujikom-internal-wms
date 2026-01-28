import express from "express";
import { signin } from "../../models/auth.js";
import { getCredentials } from "../../models/auth.js";
import { logout } from "../../models/auth.js";

const authRoute = express.Router();

authRoute.post("/signin", signin);
authRoute.get("/me", getCredentials);
authRoute.get("/logout", logout);

export default authRoute;
