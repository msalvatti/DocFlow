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

export enum Certificates {
    MARRIAGE = 1,
    BIRTH = 2,
    IMMOBILE = 3
}

export const Status = {
    pending: "PENDING",
    issued: "ISSUED",
    denied: "DENIED"
}