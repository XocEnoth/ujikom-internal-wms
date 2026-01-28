export default function logMiddleware(req, res, next) {
    console.log(
        `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] Request: ${req.method} ${req.url}`,
    );
    next();
}
