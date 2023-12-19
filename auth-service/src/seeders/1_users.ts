import ISeeder from "./ISeeder";
import usersRepository from "../repositories/usersRepository";

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
            { username: "test", password: "1234" }
        ];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await usersRepository.addUser(user);
        }

        console.log(`Finalized users seeder.`);
    }
}

export default new UsersSeeder();