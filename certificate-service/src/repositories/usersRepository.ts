import connect from "./db";
import { User } from "commons/models/user";

async function getUserById(id: string): Promise<User | null> {
    const db = await connect();

    const user = await db.users.findUnique({
        where: { id }
    });

    return user;
}

export default {
    getUserById,
}