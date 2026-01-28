export default function getTrend(chartData) {
    const first = chartData[0];
    const last = chartData[chartData.length - 1];

    if (last > first) return "up";
    if (last < first) return "down";
    return "neutral";
}
