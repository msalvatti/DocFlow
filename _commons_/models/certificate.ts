export type Certificate = {
    id?: string;
    username: string;
    name: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    address: string;
    certificate: string;
    filename?: string;
}

export enum Certificates {
    MARRIAGE = 1,
    BIRTH = 2,
    IMMOBILE = 3
}