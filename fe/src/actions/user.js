import axios from "axios";
import { config } from "../lib/config";

export default async function getUserCredentials() {
    try {
        const response = await axios.get(`${config.API_BASE_URL}/auth/me`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
