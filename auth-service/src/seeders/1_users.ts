import ISeeder from "./ISeeder";
import usersRepository from "../repositories/usersRepository";
import { Profiles } from "commons/models/user"

export class UsersSeeder implements ISeeder {
    async execute(): Promise<void> {
        console.log(`Initializing users seeder...`);

        console.log(`Checking if the users already exists...`);
        const count = await usersRepository.countUsers();
        if (count > 0) {
            console.log(`The users already exists...exitting...`);
            return;
        }

        const users = [
            { username: "admin", password: "adm1234", profile: `${Profiles.ADMINISTRATOR}`},
            { username: "operator", password: "op1234", profile: `${Profiles.OPERATOR}`},
            { username: "test", password: "1234", profile: `${Profiles.CLIENT}`},
            { username: "client1", password: "client1234", profile: `${Profiles.CLIENT}`},
            { username: "client2", password: "client1234", profile: `${Profiles.CLIENT}`}
        ];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await usersRepository.addUser(user);
        }

        console.log(`Finalized users seeder.`);
    }
}

export default new UsersSeeder();