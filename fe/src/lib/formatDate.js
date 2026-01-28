export const formatDateWIB = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    return (
        new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
        })
            .format(date)
            .replace(".", ":") + " WIB"
    );
};
export function formatDateTime(dateString) {
    if (!dateString) return null;

    const date = new Date(dateString);

    const pad = (n) => String(n).padStart(2, "0");

    return (
        `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    );
}
