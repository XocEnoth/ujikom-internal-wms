import axios from "axios";
import { config } from "../lib/config";

export async function getStatsOrderData() {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/warehouse/stats/order`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}
