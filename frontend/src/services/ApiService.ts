import axios from './AxiosConfig';

const API_URL = `${process.env.REACT_APP_API_URL}`;

export enum Profile {
    CLIENT = 1,
    OPERATOR = 2,
    ADMINISTRATOR = 3
}

export async function doLogin(username: string, password: string) {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    return response.data.token;
}

export function doLogout() {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
}