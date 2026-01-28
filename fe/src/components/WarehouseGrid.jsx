import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getWarehouseData } from "../actions/warehouse.js";
import Copyright from "./Copyright";
import WarehouseTab from "./WarehouseTab";
import { useEffect, useState } from "react";

export default function WarehouseGrid() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getWarehouseData();
            setData(response);
        }
        fetchData();
    }, []);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Warehouse Overview
            </Typography>
            <WarehouseTab data={data} />
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
