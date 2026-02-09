import axios from "axios";
import { config } from "../lib/config";

export async function getWarehouseData() {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/warehouse/getData`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function deleteCategory(id) {
    try {
        const response = await axios.delete(
            `${config.API_BASE_URL}/warehouse/deleteCategory/${id}`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}
