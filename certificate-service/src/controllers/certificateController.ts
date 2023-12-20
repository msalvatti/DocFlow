import { Request, Response } from 'express';
import certificatesRepository from "../repositories/certificatesRepository";
import { Status } from "commons/models/certificate";
import { Profiles } from "commons/models/user";

export const getRequestCertificates = async (req: Request, res: Response): Promise<Response> => {
    try {
        let userId = res.locals.token.id;

        const profile = res.locals.token.profile;

        if (profile !== `${Profiles.CLIENT}`)
            userId = null;

        const certificates = await certificatesRepository.getRequestCertificates(userId);

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

export const deleteRequestCertificatebyId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: string = req.params.id;

        let userId = res.locals.token.id;

        const profile = res.locals.token.profile;

        const existingRequestCertificate = await certificatesRepository.getRequestCertificateById(id);

        if (!existingRequestCertificate)
            return res.status(404).json({ error: 'Request Certificate not found.' });

        if (((existingRequestCertificate.userId !== userId || existingRequestCertificate.status !== Status.new) && profile === `${Profiles.CLIENT}`) ||
            (existingRequestCertificate.status !== Status.new && profile !== `${Profiles.ADMINISTRATOR}`))
            return res.status(403).json({ error: '403 Forbidden.' });

        if (profile !== `${Profiles.CLIENT}`)
            userId = null;

        await certificatesRepository.deleteRequestCertificateById(id, userId);

        return res.status(204).send();
    } catch (error) {
        console.error('Error Delete Request Certificate:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};

export const updateRequestCertificatebyId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: string = req.params.id;

        const profile = res.locals.token.profile;

        const { newStatus } = req.body;

        const existingRequestCertificate = await certificatesRepository.getRequestCertificateById(id);

        if (!existingRequestCertificate)
            return res.status(404).json({ error: 'Request Certificate not found.' });

        if (existingRequestCertificate.status !== Status.new && profile !== `${Profiles.ADMINISTRATOR}`)
            return res.status(403).json({ error: '403 Forbidden.' });

        const updatedRequest = await certificatesRepository.updateRequestCertificateById(id, { status: newStatus });

        return res.json(updatedRequest);
    } catch (error) {
        console.error('Error Update Request Certificate:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};