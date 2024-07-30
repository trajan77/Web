import * as axios from 'axios'

const client = axios.default;

const base = "http://127.0.0.1:7002";

export async function getTitle() {
    const result = await client.get(base);
    return result.data;
}

export async function sendData(data) {
    try {
        const response = await client.post('/sign', data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}