import * as axios from 'axios'

const client = axios.default;

// eslint-disable-next-line no-unused-vars
const base = "http://127.0.0.1:7002";

export async function sendData(data) {
    try {
        const response = await client.post(base + "/api/sign", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}