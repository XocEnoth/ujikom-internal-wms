import axios from "axios";
import { config } from "../lib/config";

export default async function signin(username, password) {
    try {
        const response = await axios.post(
            `${config.API_BASE_URL}/auth/signin`,
            {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
            },
        );
        return response;
    } catch (error) {
        return error.response;
    }
}
