export default function getTrendValue(chartData) {
    const first = chartData[0];
    const last = chartData[chartData.length - 1];

    if (first === 0) {
        if (last === 0) return 0;
        return 100;
    }

    const trendValue = ((last - first) / first) * 100;
    return Math.round(trendValue);
}
