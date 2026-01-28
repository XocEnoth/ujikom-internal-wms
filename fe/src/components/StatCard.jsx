import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import Avatar from "@mui/material/Avatar";

function getLast31Days() {
    const DAYS = 31;
    const today = new Date();
    const days = [];

    for (let i = DAYS - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const monthName = d.toLocaleDateString("en-US", { month: "short" });
        const day = d.getDate();
        days.push(`${monthName} ${day}`);
    }

    return days;
}

function AreaGradient({ color, id }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

function StatCard({
    title,
    value,
    interval,
    trend,
    trendValue,
    data,
    orderIcon,
}) {
    const theme = useTheme();
    const daysInMonth = getLast31Days();

    const trendColors = {
        up:
            theme.palette.mode === "light"
                ? theme.palette.success.main
                : theme.palette.success.dark,
        down:
            theme.palette.mode === "light"
                ? theme.palette.error.main
                : theme.palette.error.dark,
        neutral:
            theme.palette.mode === "light"
                ? theme.palette.grey[400]
                : theme.palette.grey[700],
    };

    const labelColors = {
        up: "success",
        down: "error",
        neutral: "default",
    };

    const color = labelColors[trend];
    const chartColor = trendColors[trend];
    const trendValues = {
        up: `+${trendValue}%`,
        down: `-${trendValue}%`,
        neutral: `${trendValue}%`,
    };

    return (
        <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "space-between",
                        flexGrow: "1",
                        gap: 1,
                    }}
                >
                    <Stack sx={{ justifyContent: "space-between" }}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Typography variant="h4" component="p">
                                    {value}
                                </Typography>
                                <Chip
                                    size="small"
                                    color={color}
                                    label={trendValues[trend]}
                                />
                            </div>
                            <Avatar>{orderIcon}</Avatar>
                        </Stack>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                        >
                            {interval}
                        </Typography>
                    </Stack>
                    <Box sx={{ width: "100%", height: 50 }}>
                        <SparkLineChart
                            color={chartColor}
                            data={data}
                            area
                            showHighlight
                            showTooltip
                            xAxis={{
                                scaleType: "band",
                                data: daysInMonth, // Use the correct property 'data' for xAxis
                            }}
                            sx={{
                                [`& .${areaElementClasses.root}`]: {
                                    fill: `url(#area-gradient-${value})`,
                                },
                            }}
                        >
                            <AreaGradient
                                color={chartColor}
                                id={`area-gradient-${value}`}
                            />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

StatCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(["down", "neutral", "up"]).isRequired,
    trendValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCard;
