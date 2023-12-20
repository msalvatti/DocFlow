export type User = {
    id?: string;
    username: string;
    password: string;
    profile: string;
}

export enum Profiles {
    CLIENT = 1,
    OPERATOR = 2,
    ADMINISTRATOR = 3
}