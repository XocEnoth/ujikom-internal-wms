import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import UnProtectedRoute from "./lib/UnProtectedRoute.jsx";
import Index from "./app/Index.jsx";
import Warehouses from "./app/warehouses/Warehouses.jsx";

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
                path="/warehouses"
                element={
                    <ProtectedRoute>
                        <Warehouses />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>,
);
