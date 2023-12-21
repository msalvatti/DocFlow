import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.resolve(__dirname, "..", "..", "files", fileName);
        if (!fs.existsSync(filePath)) {
            res.sendStatus(404);
            return;
        }

        res.download(filePath);
    } catch (error) {
        console.error('Error Get File of Request Certificates:', error);
        res.status(500).send('500 Internal Server Error.');
        return;
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
        const fileName = req.params.fileName;
        const filePath = path.resolve(__dirname, "..", "..", "files", fileName);
        if (!fs.existsSync(filePath)) return res.sendStatus(404);

        fs.unlinkSync(filePath);
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error Delete File of Request Certificates:', error);
        return res.status(500).send('500 Internal Server Error.');
    }
};