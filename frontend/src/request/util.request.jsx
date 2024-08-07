import * as axios from 'axios'

const client = axios.default;

// eslint-disable-next-line no-unused-vars
const base = "http://127.0.0.1:7002";

export async function sign(data) {
    try {
        const response = await client.post(base + "/api/sign", data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getUser(username) {
    try {
        const response = await client.get(base + `/api/user/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function createTeam({user, team, intro}) {
    try {
        const response = await client.post(base + `/api/team/create`, {user, team, intro});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getTeam(userTeam) {
    try {
        const response = await client.get(base + `/api/team/${userTeam}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getMembers(userTeam) {
    try {
        const response = await client.get(base + `/api/team/members/${userTeam}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function inviteMembers({teamID, name}) {
    console.log(name);
    try {
        const response = await client.post(base + `/api/team/invite`, {teamID, name});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}