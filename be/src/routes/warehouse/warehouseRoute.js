import express from "express";
import { getDataWarehouse } from "../../models/warehouse.js";

const warehouseRoute = express.Router();

warehouseRoute.get("/getData", getDataWarehouse);

export default warehouseRoute;
