import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getFile = async (req: Request, res: Response): Promise<Response> => {
    try {


        return res.status(200).send('getFile');
    } catch (error) {
        console.error('Error Get File of Request Certificates:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};

export const addFile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const uploadedFile = req.file;

        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const folder = path.resolve(__dirname, "..", "..", "files");
        const oldPath = path.join(folder, uploadedFile.filename);

        const newPath = path.join(folder, uploadedFile.originalname);
        fs.renameSync(oldPath, newPath);

        return res.json({ fileName: uploadedFile.originalname });
    } catch (error) {
        console.error('Error Add File of Request Certificates:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};

export const deleteFile = async (req: Request, res: Response): Promise<Response> => {
    try {


        return res.status(200).send('deleteFile');
    } catch (error) {
        console.error('Error Delete File of Request Certificates:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};