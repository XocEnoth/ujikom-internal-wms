export const formatRupiah = (value) => {
    if (value === null || value === undefined || value === "") return null;

    const number = Number(value);
    if (Number.isNaN(number)) return "NaN";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};
