import connect from "./db";
import { Certificate, Status } from "commons/models/certificate";

async function getRequestCertificates(userId?: string): Promise<Certificate[] | null> {
    const db = await connect();

    const whereClause = userId ? { userId } : {};

    const certificates = await db.certificates.findMany({
        where: whereClause,
    });

    return certificates;
}

async function getSearchRequestCertificates(search: string, userId?: string): Promise<Certificate[] | null> {
    const db = await connect();

    const whereCondition: any = {
        OR: [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                cpf: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                phone: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                address: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                certificate: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                status: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
        ]
    };

    if (userId) {
        whereCondition.AND = {
            userId: userId,
        };
    }

    const certificates = await db.certificates.findMany({
        where: whereCondition,
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
            status: Status.pending,
            filename: certificate.filename || null,
            createAt: new Date(),
            updateAt: new Date()
        },
    });

    return newCertificate;
}

async function deleteRequestCertificateById(id: string, userId?: string): Promise<void> {
    const db = await connect();

    const whereClause = {
        id,
        ...(userId ? { userId } : {}),
    };

    await db.certificates.delete({
        where: whereClause,
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
    getRequestCertificates,
    getRequestCertificateById,
    getSearchRequestCertificates,
    addRequestCertificate,
    updateRequestCertificateById,
    deleteRequestCertificateById
}