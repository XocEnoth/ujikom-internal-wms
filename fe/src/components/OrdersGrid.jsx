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
import OrdersViewDialog from "./OrdersViewDialog";
import OrdersEditDialog from "./OrdersEditDialog";
import {
    getOrdersData,
    getOrderDetailsById,
    deleteOrderDetailsById,
} from "../actions/orders";
import { formatDateWIB } from "../lib/formatDate";
import { formatRupiah } from "../lib/formatCurrency";

const columns = [
    { field: "id", headerName: "ID" },
    { field: "order_number", headerName: "Order Number" },
    { field: "name", headerName: "Customer" },
    { field: "payment_method", headerName: "Payment Method" },
    { field: "status", headerName: "Status" },
    { field: "total_amount", headerName: "Total Amount" },
    { field: "date_created", headerName: "Date Created" },
    { field: "created_by", headerName: "Created By" },
    { field: "date_updated", headerName: "Date Updated" },
    { field: "updated_by", headerName: "Updated By" },
];

export default function OrdersGrid({ dataUser }) {
    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openOrdersViewDialog, setOpenOrdersViewDialog] = useState(false);
    const [openOrdersEditDialog, setOpenOrdersEditDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);

    async function handleViewOrder() {
        if (selectedId) {
            const response = await getOrderDetailsById(selectedId);
            setOrderDetails(response);
            setOpenOrdersViewDialog(true);
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage("Please select an order!");
        }
    }

    async function handleEditOrder() {
        if (selectedId) {
            const response = await getOrderDetailsById(selectedId);
            setOrderDetails(response);
            setOpenOrdersEditDialog(true);
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage("Please select an order!");
        }
    }

    async function handleDeleteOrder() {
        if (selectedId) {
            const response = await deleteOrderDetailsById(selectedId);
            if (response.success) {
                window.location.reload();
            }
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage("Please select an order!");
        }
    }

    function handleSnackbarClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getOrdersData();
            const formattedRows = response?.orders.map((order) => ({
                ...order,
                total_amount: formatRupiah(order.total_amount),
                date_created: formatDateWIB(order.date_created),
                date_updated: formatDateWIB(order.date_updated),
            }));
            setRows(formattedRows);
        }
        fetchData();
    }, []);

    return (
        <>
            <OrdersViewDialog
                open={openOrdersViewDialog}
                handleClose={() => setOpenOrdersViewDialog(false)}
                orderDetails={orderDetails}
            />
            <OrdersEditDialog
                open={openOrdersEditDialog}
                handleClose={() => setOpenOrdersEditDialog(false)}
                orderDetails={orderDetails}
            />
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
                        Orders
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
                            onClick={(e) => {
                                e.preventDefault();
                                handleViewOrder();
                            }}
                        >
                            View Order
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AddIcon />}
                            sx={{ maxHeight: "31.5px" }}
                            hidden={selectedId}
                        >
                            Add Order
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<EditOutlinedIcon />}
                            sx={{ maxHeight: "31.5px" }}
                            hidden={!selectedId}
                            onClick={(e) => {
                                e.preventDefault();
                                handleEditOrder();
                            }}
                        >
                            Edit Order
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            sx={{
                                maxHeight: "31.5px",
                            }}
                            hidden={!selectedId}
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteOrder();
                            }}
                        >
                            Delete Order
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
