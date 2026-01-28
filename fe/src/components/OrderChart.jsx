import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function OrderChart({ data }) {
    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Order Statistics
                </Typography>
                <Stack sx={{ justifyContent: "space-between" }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: "center", sm: "flex-start" },
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            {`Total Order: ${data.totalOrder}`}
                        </Typography>
                    </Stack>
                </Stack>
                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: "band",
                            categoryGapRatio: 0.5,
                            data: [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ],
                            height: 24,
                        },
                    ]}
                    yAxis={[{ width: 50 }]}
                    series={[
                        {
                            id: "prepaid",
                            label: "Prepaid",
                            data: data.prepaid || [],
                            stack: "A",
                        },
                        {
                            id: "cod",
                            label: "CoD",
                            data: data.cod || [],
                            stack: "A",
                        },
                    ]}
                    height={250}
                    margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
                    grid={{ horizontal: true }}
                />
            </CardContent>
        </Card>
    );
}
