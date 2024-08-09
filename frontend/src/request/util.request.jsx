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
    try {
        const response = await client.post(base + `/api/team/invite`, {teamID, name});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function teamGo({name}) {
    try {
        const response = await client.post(base + `/api/team/go`, {name});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function createProject({name, teamID}) {
    try {
        const response = await client.post(base + `/api/project/create`, {name, teamID});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getProjects(userTeam) {
    try {
        const response = await client.get(base + `/api/project/${userTeam}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function addTask({projectId,taskName,taskData,dueDate}) {
    try {
        const response = await client.post(base + `/api/project/add`, {projectId,taskName,taskData,dueDate});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getTasks(projectID) {
    try {
        const response = await client.get(base + `/api/project/task/${projectID}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function delProject({projectID}) {
    try {
        const response = await client.post(base + `/api/project/del`, {projectID});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function taskNext({taskID}) {
    try {
        const response = await client.post(base + `/api/project/taskNext`, {taskID});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function taskPrev({taskID}) {
    try {
        const response = await client.post(base + `/api/project/taskPrev`, {taskID});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function sendComment({comment,taskID,userName}) {
    try {
        const response = await client.post(base + `/api/project/taskComment`, {comment, taskID, userName});
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}
export async function getComments(taskID) {
    try {
        const response = await client.get(base + `/api/project/comment/${taskID}`);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
}