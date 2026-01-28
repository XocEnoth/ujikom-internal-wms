import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import DenseTable from "./DenseTable";
import { formatDateTime } from "../lib/formatDate";
import { formatRupiah } from "../lib/formatCurrency";
import { editOrderDetailsByOrderNumber } from "../actions/orders";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function createData(products, price, quantity, sub_total) {
    return { products, price, quantity, sub_total };
}

export default function OrdersEditDialog({ open, handleClose, orderDetails }) {
    const orderNumber = orderDetails?.orders?.[0]?.order_number;
    const [inputStatusValue, setInputStatusValue] = React.useState("");
    const [inputCustomerNameValue, setInputCustomerNameValue] =
        React.useState("");
    const [inputCustomerEmailValue, setInputCustomerEmailValue] =
        React.useState("");
    const [inputShippingAddressValue, setInputShippingAddressValue] =
        React.useState("");
    const [inputPaymentMethodValue, setInputPaymentMethodValue] =
        React.useState("");

    const shippingFee = 25000;
    const rows =
        orderDetails?.orders?.map((item) => {
            return createData(
                item?.product_name,
                formatRupiah(item?.price),
                item?.quantity,
                formatRupiah(item?.price * item?.quantity),
            );
        }) ?? [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            status: inputStatusValue
                ? inputStatusValue
                : orderDetails?.orders?.[0]?.status,
            customer_name: inputCustomerNameValue
                ? inputCustomerNameValue
                : orderDetails?.orders?.[0]?.customer_name,
            customer_email: inputCustomerEmailValue
                ? inputCustomerEmailValue
                : orderDetails?.orders?.[0]?.email,
            customer_address: inputShippingAddressValue
                ? inputShippingAddressValue
                : orderDetails?.orders?.[0]?.address,
            payment_method: inputPaymentMethodValue
                ? inputPaymentMethodValue
                : orderDetails?.orders?.[0]?.payment_method,
        };

        const response = await editOrderDetailsByOrderNumber(orderNumber, body);
        if (response.success) {
            window.location.reload();
        } else {
            handleClose();
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                maxWidth="md"
                fullWidth={true}
            >
                <Box
                    sx={{
                        paddingY: "16px",
                        paddingX: "24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" component="h1">
                        Order Details: {orderDetails?.orders?.[0]?.order_number}
                    </Typography>
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body1"
                                component="p"
                                color="textSecondary"
                            >
                                Order Date & Time:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {formatDateTime(
                                    orderDetails?.orders?.[0]?.date_created,
                                )}
                            </Typography>
                        </Box>
                        <div className="flex flex-col sm:flex-row sm:gap-1">
                            <Typography variant="body1" component="p">
                                Status:
                            </Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                sx={{ maxWidth: 60 }}
                                defaultValue={orderDetails?.orders?.[0]?.status}
                                onChange={(e) => {
                                    setInputStatusValue(e.target.value);
                                }}
                            />
                        </div>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ marginBottom: "12px" }}
                            >
                                Customer Information
                            </Typography>
                            <Typography
                                variant="body1"
                                component="p"
                                color="textSecondary"
                            >
                                Name:
                            </Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                defaultValue={
                                    orderDetails?.orders?.[0]?.customer_name
                                }
                                onChange={(e) => {
                                    setInputCustomerNameValue(e.target.value);
                                }}
                            />
                            <Typography
                                variant="body1"
                                component="p"
                                color="textSecondary"
                            >
                                Email:
                            </Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                defaultValue={orderDetails?.orders?.[0]?.email}
                                onChange={(e) => {
                                    setInputCustomerEmailValue(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ marginBottom: "12px" }}
                            >
                                Shipping & Payment
                            </Typography>
                            <Typography
                                variant="body1"
                                component="p"
                                color="textSecondary"
                            >
                                Shipping Address:
                            </Typography>
                            <TextField
                                variant="standard"
                                multiline
                                maxRows={2}
                                size="small"
                                defaultValue={
                                    orderDetails?.orders?.[0]?.address
                                }
                                onChange={(e) => {
                                    setInputShippingAddressValue(
                                        e.target.value,
                                    );
                                }}
                                sx={{ width: "100%" }}
                            />
                            <Typography
                                variant="body1"
                                component="p"
                                color="textSecondary"
                            >
                                Payment Method:
                            </Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                defaultValue={
                                    orderDetails?.orders?.[0]?.payment_method
                                }
                                onChange={(e) => {
                                    setInputPaymentMethodValue(e.target.value);
                                }}
                                sx={{ maxWidth: 50 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ marginBottom: "12px" }}
                            >
                                Order Items
                            </Typography>
                            <DenseTable rows={rows} />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            float: "right",
                            minWidth: "220px",
                            marginTop: "16px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body1" component="p">
                                Subtotal:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {formatRupiah(
                                    orderDetails?.orders?.[0]?.total_amount,
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body1" component="p">
                                Shipping:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {formatRupiah(shippingFee)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "12px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                Total:
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                {formatRupiah(
                                    Number(
                                        orderDetails?.orders?.[0]?.total_amount,
                                    ) + shippingFee,
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="success"
                        disabled={
                            !inputStatusValue &&
                            !inputCustomerNameValue &&
                            !inputCustomerEmailValue &&
                            !inputShippingAddressValue &&
                            !inputPaymentMethodValue
                        }
                    >
                        Save
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
