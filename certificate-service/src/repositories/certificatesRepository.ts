import connect from "./db";
import { Certificate, Status } from "commons/models/certificate";

async function getRequestCertificatesbyUser(userId: string): Promise<Certificate[] | null> {
    const db = await connect();

    const certificates = await db.certificates.findMany({
        where: {
            userId: userId,
        },
    });

    return certificates;
}

async function getRequestCertificateById(id: string): Promise<Certificate | null> {
    const db = await connect();

    const certificate = await db.certificates.findUnique({
        where: {
            id,
        },
    });

    return certificate;
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
            status: Status.new,
            filename: certificate.filename || null,
            createAt: new Date(),
            updateAt: new Date()
        },
    });

    return newCertificate;
}

async function deleteRequestCertificateByUser(id: string, userId: string): Promise<void> {
    const db = await connect();

    await db.certificates.delete({
        where: {
            id,
            userId: userId,
            status: Status.new,
        },
    });
}

async function updateRequestCertificateById(id: string, updatedCertificateData: Partial<Certificate>): Promise<Certificate | null> {
    const db = await connect();

    const updatedCertificate = await db.certificates.update({
        where: {
            id,
        },
        data: updatedCertificateData,
    });

    return updatedCertificate;
}


export default {
    getRequestCertificatesbyUser,
    getRequestCertificateById,
    addRequestCertificate,
    deleteRequestCertificateByUser,
    updateRequestCertificateById
}