export default function calculatePaymentPercentage(orderPayment) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthData = orderPayment.filter((item) => {
        const date = new Date(item.date_created);
        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    });

    const totals = currentMonthData.reduce(
        (acc, item) => {
            const amount = Number(item.total_amount);
            acc[item.payment_method] = (acc[item.payment_method] || 0) + amount;
            return acc;
        },
        { cod: 0, prepaid: 0 },
    );

    const grandTotal = totals.cod + totals.prepaid;

    if (grandTotal === 0) {
        return { cod: 0, prepaid: 0 };
    }

    return {
        cod: +((totals.cod / grandTotal) * 100).toFixed(2),
        prepaid: +((totals.prepaid / grandTotal) * 100).toFixed(2),
    };
}
