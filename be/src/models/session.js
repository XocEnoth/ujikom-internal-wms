import crypto from "crypto";
import { sql } from "../lib/db.js";

export const checkSession = async (req, res) => {
    try {
        const sid = req.cookies.sid;
        if (!sid) {
            return res.sendStatus(401);
        }
        const hash_sid = crypto.createHash("sha256").update(sid).digest("hex");

        const [resultcheck] = await sql.query(
            `SELECT
                id
            FROM
                session_login
            WHERE
                session_id = ?
            LIMIT 1;`,
            [hash_sid],
        );

        if (resultcheck.length === 0) {
            return res.sendStatus(401);
        }
        return res.sendStatus(200);
    } catch (error) {
        console.error("Error in checkSession :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
