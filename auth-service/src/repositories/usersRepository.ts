import bcrypt from 'bcrypt';
import connect from "./db";
import { User } from "commons/models/user";

async function getUser(login: string, password: string): Promise<User | null> {
    const db = await connect();

    const user = await db.users.findFirst({
        where: { login, password }
    });

    return user;
}

async function countUsers(): Promise<number> {
    const db = await connect();

    const count = await db.users.count();

    return count;
}

async function addUser(user: User) : Promise<User> {
    if(!user.login || !user.password) throw new Error(`Invalid user!`);

    const db = await connect();

    const existingUser = await getUser(user.login, user.password);
    if(existingUser) throw new Error(`User exists!`);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = await db.users.create({
        data: {
            login: user.login,
            password: hashedPassword
        }
    })

    return newUser;
}

export default {
    getUser,
    countUsers,
    addUser
}