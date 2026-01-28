import mysql from "mysql2/promise";
import { config } from "../config/config.js";

export const sql = await mysql.createConnection(config.db);
