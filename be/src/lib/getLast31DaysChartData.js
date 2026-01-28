export default function getLast31DaysChartData(data, key) {
    const toDateKey = (date) => new Date(date).toISOString().split("T")[0];

    const countPerDay = data.reduce((acc, item) => {
        const dateKey = toDateKey(item[key]);
        acc[dateKey] = (acc[dateKey] || 0) + 1;
        return acc;
    }, {});

    const DAYS = 31;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const last31Days = Array.from({ length: DAYS }, (_, i) => {
        const d = new Date(today);
        d.setUTCDate(today.getUTCDate() - (DAYS - 1 - i));
        return toDateKey(d);
    });

    return last31Days.map((date) => countPerDay[date] || 0);
}
