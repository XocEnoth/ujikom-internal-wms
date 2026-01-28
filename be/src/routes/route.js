import authRoute from "./auth/authRoute.js";
import sessionRoute from "./auth/sessionRoute.js";
import warehouseRoute from "./warehouse/warehouseRoute.js";

export default function route(app) {
    app.use("/api/auth", authRoute);
    app.use("/api/session", sessionRoute);
    app.use("/api/warehouse", warehouseRoute);
}
