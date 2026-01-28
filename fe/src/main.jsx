import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import UnProtectedRoute from "./lib/UnProtectedRoute.jsx";
import Index from "./app/Index.jsx";
import Dashboard from "./app/dashboard/Dashboard.jsx";
import Warehouses from "./app/warehouses/Warehouses.jsx";
import Orders from "./app/orders/Orders.jsx";
import Shipments from "./app/shipments/Shipments.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <UnProtectedRoute>
                        <Index />
                    </UnProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/warehouses"
                element={
                    <ProtectedRoute>
                        <Warehouses />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/shipments"
                element={
                    <ProtectedRoute>
                        <Shipments />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>,
);
