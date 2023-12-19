import ISeeder from "./ISeeder";
import usersSeeder from "./1_users";

const seeders: ISeeder[] = [
    usersSeeder
]

async function start() {
    console.log(`Initializing Seeders Index...`);
    for (let i = 0; i < seeders.length; i++) {
        await seeders[i].execute();
    }
    console.log(`Finalized Seeders Index.`);
}

start();