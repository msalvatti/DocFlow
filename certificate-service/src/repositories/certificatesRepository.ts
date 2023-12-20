import connect from "./db";
import { Certificate } from "commons/models/certificate";

async function getRequestCertificatesbyUser(userId: string): Promise<Certificate[] | null> {
    const db = await connect();

    const certificates = await db.certificates.findMany({
        where: {
            userId: userId,
        },
    });

    return certificates;
}

async function addRequestCertificate(certificate: Certificate): Promise<Certificate> {
    const db = await connect();

    const newCertificate = await db.certificates.create({
        data: {
            userId: certificate.userId,
            name: certificate.name,
            cpf: certificate.cpf,
            phone: certificate.phone,
            birthDate: new Date(certificate.birthDate),
            address: certificate.address,
            certificate: certificate.certificate,
            filename: certificate.filename || null,
            createAt: new Date(),
            updateAt: new Date()
        },
    });

    return newCertificate;
}

export default {
    getRequestCertificatesbyUser,
    addRequestCertificate
}