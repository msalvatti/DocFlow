import { Request, Response } from 'express';
import certificatesRepository from "../repositories/certificatesRepository";
import usersRepository from "../repositories/usersRepository";

export const getCertificatesbyUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = res.locals.token.id;

        const user = await usersRepository.getUserById(userId);
        if (!user) return res.status(422).send('User not found.');

        const certificates = certificatesRepository.getCertificatesbyUser(userId);
        
        return res.json(certificates);
    } catch (error) {
        console.error('Error Get Certificates by User:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};