import axios from "axios";
import { config } from "../lib/config";

export async function getOrdersData() {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/warehouse/orders`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function getOrderDetailsById(id) {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/warehouse/order/details/${id}`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function editOrderDetailsByOrderNumber(orderNumber, body = []) {
    try {
        const response = await axios.put(
            `${config.API_BASE_URL}/warehouse/order/details/${orderNumber}`,
            body,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export async function deleteOrderDetailsById(id) {
    try {
        const response = await axios.delete(
            `${config.API_BASE_URL}/warehouse/order/details/${id}`,
        );
        return response.data;
    } catch (error) {
        return error.response;
    }
}
