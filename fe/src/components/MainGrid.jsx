import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useEffect, useState } from "react";
import HighlightedCard from "./HighlightedCard";
import OrderChart from "./OrderChart";
import Copyright from "./Copyright";
import StatCard from "./StatCard";
import { getStatsOrderData } from "../actions/dashboard";

export default function MainGrid() {
    const [deliveredValue, setDeliveredValue] = useState(0);
    const [shippedValue, setShippedValue] = useState(0);
    const [returnedValue, setReturnedValue] = useState(0);
    const [cancelledValue, setCancelledValue] = useState(0);
    const [deliveredTrend, setDeliveredTrend] = useState("");
    const [shippedTrend, setShippedTrend] = useState("");
    const [returnedTrend, setReturnedTrend] = useState("");
    const [cancelledTrend, setCancelledTrend] = useState("");
    const [deliveredTrendValue, setDeliveredTrendValue] = useState("");
    const [shippedTrendValue, setShippedTrendValue] = useState("");
    const [returnedTrendValue, setReturnedTrendValue] = useState("");
    const [cancelledTrendValue, setCancelledTrendValue] = useState("");
    const [deliveredData, setDeliveredData] = useState([]);
    const [shippedData, setShippedData] = useState([]);
    const [returnedData, setReturnedData] = useState([]);
    const [cancelledData, setCancelledData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const data = [
        {
            title: "Orders Delivered",
            value: deliveredValue,
            interval: "Last 31 days",
            trend: deliveredTrend,
            trendValue: deliveredTrendValue,
            data: deliveredData,
            orderIcon: <InventoryIcon />,
        },
        {
            title: "Orders Shipped",
            value: shippedValue,
            interval: "Last 31 days",
            trend: shippedTrend,
            trendValue: shippedTrendValue,
            data: shippedData,
            orderIcon: <LocalShippingIcon />,
        },
        {
            title: "Order Returned",
            value: returnedValue,
            interval: "Last 31 days",
            trend: returnedTrend,
            trendValue: returnedTrendValue,
            data: returnedData,
            orderIcon: <AssignmentReturnIcon />,
        },
        {
            title: "Order Cancelled",
            value: cancelledValue,
            interval: "Last 31 days",
            trend: cancelledTrend,
            trendValue: cancelledTrendValue,
            data: cancelledData,
            orderIcon: <DisabledByDefaultIcon />,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await getStatsOrderData();
            setDeliveredValue(response.delivered.value);
            setShippedValue(response.shipped.value);
            setReturnedValue(response.returned.value);
            setCancelledValue(response.cancelled.value);
            setDeliveredTrend(response.delivered.trend);
            setShippedTrend(response.shipped.trend);
            setReturnedTrend(response.returned.trend);
            setCancelledTrend(response.cancelled.trend);
            setDeliveredData(response.delivered.chartData);
            setShippedData(response.shipped.chartData);
            setReturnedData(response.returned.chartData);
            setCancelledData(response.cancelled.chartData);
            setDeliveredTrendValue(response.delivered.trendValue);
            setShippedTrendValue(response.shipped.trendValue);
            setReturnedTrendValue(response.returned.trendValue);
            setCancelledTrendValue(response.cancelled.trendValue);
            setOrderData(response.order);
        };
        fetchData();
    }, []);
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Dashboard
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                <Grid size={{ xs: 12, lg: 4 }}>
                    <HighlightedCard orderData={orderData} />
                </Grid>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <OrderChart data={orderData} />
                </Grid>
            </Grid>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Inventory Overview
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
