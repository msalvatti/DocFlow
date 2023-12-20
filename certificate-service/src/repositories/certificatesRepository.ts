import connect from "./db";
import { Certificate } from "commons/models/certificate";

async function getCertificatesbyUser(userId: string): Promise<Certificate[] | null> {
    const db = await connect();

    const certificates = await db.certificates.findMany({
        where: {
            id: userId,
        },
    });

    return certificates;
}

export default {
    getCertificatesbyUser,
}