import axios from "axios";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { config } from "../lib/config";

export default function UnProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}/session`,
                    {
                        withCredentials: true,
                    },
                );
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (isLoading) {
        return children;
    }

    if (isAuthenticated) {
        return <Navigate to="/warehouses" />;
    }

    return children;
}
