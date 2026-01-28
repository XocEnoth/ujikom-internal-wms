import express from "express";
import {
    getDataWarehouse,
    getStatsOrder,
    getOrders,
    getOrderDetailsById,
    editOrderDetailsByOrderNumber,
    deleteOrderDetailsById,
    getShipments,
} from "../../models/warehouse.js";

const warehouseRoute = express.Router();

warehouseRoute.get("/getData", getDataWarehouse);
warehouseRoute.get("/stats/order", getStatsOrder);
warehouseRoute.get("/orders", getOrders);
warehouseRoute.get("/order/details/:id", getOrderDetailsById);
warehouseRoute.put(
    "/order/details/:ordernumber",
    editOrderDetailsByOrderNumber,
);
warehouseRoute.delete("/order/details/:id", deleteOrderDetailsById);
warehouseRoute.get("/shipments", getShipments);

export default warehouseRoute;
