import argon2 from "argon2";
import crypto from "crypto";
import { signinSchema } from "../schemas/auth.schema.js";
import { sql } from "../lib/db.js";

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const parsing = signinSchema.safeParse({ username, password });
        if (!parsing.success) {
            return res.status(400).json({
                message:
                    "Oops, your credentials doesn’t match. Please try again.",
            });
        }

        const parsedUsername = parsing?.data?.username;
        const parsedPassword = parsing?.data?.password;

        const [findUser] = await sql.query(
            `SELECT
                id, password
            FROM
                users
            WHERE
                username = ?
            AND
                record_status = 1
            LIMIT 1;`,
            [parsedUsername],
        );

        if (findUser.length === 0) {
            return res.status(400).json({
                message:
                    "Oops, your credentials doesn’t match. Please try again.",
            });
        }

        if (!(await argon2.verify(findUser[0].password, parsedPassword))) {
            return res.status(400).json({
                message:
                    "Oops, your credentials doesn’t match. Please try again.",
            });
        }
        const session_id = crypto.randomBytes(32).toString("base64url");
        const hash_sid = crypto
            .createHash("sha256")
            .update(session_id)
            .digest("hex");

        await sql.query(
            `INSERT INTO
                session_login (user_id, session_id, date_created)
            VALUES
                (?, ?, ?);`,
            [findUser[0].id, hash_sid, new Date(Date.now())],
        );

        res.cookie("sid", session_id, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "Signin successfully.",
        });
    } catch (error) {
        console.error("Error in signin :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getCredentials = async (req, res) => {
    try {
        const sid = req.cookies.sid;
        if (!sid) {
            return res.sendStatus(401);
        }

        const hash_sid = crypto.createHash("sha256").update(sid).digest("hex");

        const [resultGet] = await sql.query(
            `SELECT
                users.username,
                users.email,
                users.role_code
            FROM
                session_login
            INNER JOIN
                users
            ON
                session_login.user_id = users.id
            WHERE
                session_login.session_id = ?
            AND
                users.record_status = 1
            LIMIT 1;`,
            [hash_sid],
        );

        if (resultGet.length === 0) {
            return res.sendStatus(401);
        }
        return res.status(200).json({ users: resultGet });
    } catch (error) {
        console.error("Error in getCredentials :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const logout = async (req, res) => {
    try {
        const sid = req.cookies.sid;
        if (!sid) {
            return res.sendStatus(401);
        }

        const hash_sid = crypto.createHash("sha256").update(sid).digest("hex");

        await sql.query(
            `DELETE FROM 
                session_login 
            WHERE session_id = ?;`,
            [hash_sid],
        );
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in logout :\n\n", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
