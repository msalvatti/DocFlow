import axios from './AxiosConfig';

const API_URL = `${process.env.REACT_APP_API_URL}`;

export type Certificate = {
    id?: string;
    userId: string;
    name: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    address: string;
    certificate: string;
    status: string;
    filename?: string | null;
    createAt: Date;
    updateAt: Date;
}

export const Status = {
    pending: "PENDING",
    issued: "ISSUED",
    denied: "DENIED"
}

export enum Certificates {
    MARRIAGE = 1,
    BIRTH = 2,
    IMMOBILE = 3
}

export enum Profile {
    CLIENT = 1,
    OPERATOR = 2,
    ADMINISTRATOR = 3
}

export async function doLogin(username: string, password: string) {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    return response.data.token;
}

export async function getRequestCertificates() {
    const response = await axios.get(`${API_URL}/api/certificate`);
    return response;
}

export function doLogout() {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
}