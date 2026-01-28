import express from "express";
import { checkSession } from "../../models/session.js";

const sessionRoute = express.Router();

sessionRoute.get("/", checkSession);

export default sessionRoute;
