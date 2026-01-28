import axios from "axios";
import { config } from "../lib/config";

export async function getShipmentsData() {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/warehouse/shipments`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}
