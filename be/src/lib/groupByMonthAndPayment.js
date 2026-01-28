export default function groupByMonthAndPayment(data) {
    const result = {};

    data.forEach((item) => {
        const month = item.date_created.getUTCMonth();
        const method = item.payment_method;

        if (!result[method]) {
            result[method] = Array(12).fill(0);
        }

        result[method][month] += 1;
    });

    return result;
}
