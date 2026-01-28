import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Copyright from "./Copyright";
import DataTable from "./DataTable";
import { formatDateWIB } from "../lib/formatDate";
import { getShipmentsData } from "../actions/shipments";

const columns = [
    { field: "id", headerName: "ID" },
    { field: "order_number", headerName: "Order Number" },
    { field: "courier", headerName: "Courier" },
    { field: "tracking_number", headerName: "Tracking Number" },
    { field: "shipped_at", headerName: "Shipped At" },
    { field: "delivered_at", headerName: "Delivered At" },
    { field: "status", headerName: "Status" },
];

export default function ShipmentsGrid({ dataUser }) {
    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    function handleSnackbarClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getShipmentsData();
            const formattedRows = response?.shipments.map((shipment) => ({
                ...shipment,
                shipped_at: formatDateWIB(shipment.shipped_at),
                delivered_at: formatDateWIB(shipment.delivered_at),
            }));
            setRows(formattedRows);
        }
        fetchData();
    }, []);

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="info"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
                {/* cards */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                    }}
                    className="flex-col sm:flex-row"
                >
                    <Typography component="h2" variant="h6">
                        Shipments
                    </Typography>
                    <Box
                        sx={{ display: "flex", gap: 1 }}
                        className="flex-col sm:flex-row"
                        hidden={dataUser.role_code !== "SADM"}
                    >
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<RemoveRedEyeOutlinedIcon />}
                            sx={{ maxHeight: "31.5px" }}
                            hidden={!selectedId}
                        >
                            View Shipments
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AddIcon />}
                            sx={{ maxHeight: "31.5px" }}
                            hidden={selectedId}
                        >
                            Add Shipments
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<EditOutlinedIcon />}
                            sx={{ maxHeight: "31.5px" }}
                            hidden={!selectedId}
                        >
                            Edit Shipments
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            sx={{
                                maxHeight: "31.5px",
                            }}
                            hidden={!selectedId}
                        >
                            Delete Shipments
                        </Button>
                    </Box>
                </Box>
                <DataTable
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => {
                        setSelectedId(...row.ids);
                    }}
                />
                <Copyright sx={{ my: 4 }} />
            </Box>
        </>
    );
}
