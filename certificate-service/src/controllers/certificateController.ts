import { Request, Response } from 'express';
import certificatesRepository from "../repositories/certificatesRepository";

export const getRequestCertificatesbyUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = res.locals.token.id;

        const certificates = await certificatesRepository.getRequestCertificatesbyUser(userId);

        return res.json(certificates);
    } catch (error) {
        console.error('Error Get Request Certificates by User:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};

export const AddRequestCertificate = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { certificate } = req.body;
        if (!certificate) throw new Error(`Invalid request certificate!`);

        certificate.userId = res.locals.token.id;

        const newCertificate = await certificatesRepository.addRequestCertificate(certificate);

        return res.json(newCertificate);
    } catch (error) {
        console.error('Error Add Request Certificate:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};

export const deleteRequestCertificatesbyUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: string = req.params.id;

        const userId = res.locals.token.id;

        const existingRequestCertificate = await certificatesRepository.getRequestCertificateById(id);

        if (!existingRequestCertificate)
            return res.status(404).json({ error: 'Request Certificate not found.' });

        if (existingRequestCertificate.userId !== userId)
            return res.status(403).json({ error: '403 Forbidden.' });

        await certificatesRepository.deleteRequestCertificateByUser(id, userId);

        return res.status(204).send();
    } catch (error) {
        console.error('Error Delete Request Certificate:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};
