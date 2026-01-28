export default function getTotalAmount(totalAmount) {
    let total = 0;
    totalAmount.forEach((val) => {
        total += Number(val.total_amount);
    });
    return total;
}
