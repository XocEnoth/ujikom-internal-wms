import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function HighlightedCard({ orderData }) {
    const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(orderData.totalAmount);
    return (
        <Card
            sx={{
                height: "100%",
                backgroundImage: "url(/bg_dashboard.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div className="flex flex-col gap-2">
                    <Typography
                        component="h1"
                        variant="h3"
                        color="#0b0e14"
                        sx={{ fontWeight: "bold" }}
                    >
                        {`Rp. ${formatted}`}
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                        color="#0b0e14"
                    >
                        Orders This Month
                    </Typography>
                </div>
                <div className="flex flex-col gap-2">
                    <Chip
                        size="small"
                        color="primary"
                        label={`${orderData.paymentPercentage?.prepaid || 0}% Prepaid`}
                    />
                    <Chip
                        size="small"
                        color="primary"
                        label={`${orderData.paymentPercentage?.cod || 0}% CoD`}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
